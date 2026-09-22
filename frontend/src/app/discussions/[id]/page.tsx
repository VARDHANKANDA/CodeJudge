'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../../lib/api';
import { useAuthStore } from '../../../store/auth';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Send,
  Loader2,
  CornerDownRight,
  User,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface CommentAuthor {
  id: string;
  username: string;
  name?: string;
  avatarUrl?: string;
}

interface CommentReply {
  id: string;
  content: string;
  createdAt: string;
  author: CommentAuthor;
  _count: {
    likes: number;
  };
}

interface ThreadComment {
  id: string;
  content: string;
  createdAt: string;
  author: CommentAuthor;
  replies: CommentReply[];
  _count: {
    likes: number;
  };
}

interface DiscussionThread {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    name?: string;
    avatarUrl?: string;
  };
  comments: ThreadComment[];
  _count: {
    likes: number;
  };
}

export default function DiscussionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();

  const [commentText, setCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);

  // Fetch thread details
  const { data: thread, isLoading, isError } = useQuery<DiscussionThread>({
    queryKey: ['discussion-detail', id],
    queryFn: () => apiRequest(`/discussions/${id}`),
  });

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: (body: { discussionId?: string; commentId?: string }) =>
      apiRequest('/discussions/like', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussion-detail', id] });
    },
  });

  // Post comment mutation
  const addCommentMutation = useMutation({
    mutationFn: (body: { content: string; parentId?: string }) =>
      apiRequest(`/discussions/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      setCommentText('');
      setReplyText('');
      setReplyingToId(null);
      setCommentError(null);
      queryClient.invalidateQueries({ queryKey: ['discussion-detail', id] });
    },
    onError: (err: any) => {
      setCommentError(err.message || 'Failed to post comment');
    },
  });

  const handlePostRootComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentError(null);
    addCommentMutation.mutate({ content: commentText.trim() });
  };

  const handlePostReply = (parentId: string) => {
    if (!replyText.trim()) return;
    setCommentError(null);
    addCommentMutation.mutate({ content: replyText.trim(), parentId });
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-gray-400 text-sm">Opening discussion thread...</p>
      </div>
    );
  }

  if (isError || !thread) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-danger font-medium text-lg">Discussion thread not found.</p>
        <Link href="/discussions" className="text-primary hover:underline text-sm inline-flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to all discussions</span>
        </Link>
      </div>
    );
  }

  const totalComments = thread.comments.reduce(
    (acc, curr) => acc + 1 + (curr.replies?.length || 0),
    0,
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Back button */}
      <div>
        <Link
          href="/discussions"
          className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Discussions</span>
        </Link>
      </div>

      {/* Main Thread Article */}
      <article className="glass-panel p-8 rounded-3xl border border-border/60 shadow-xl space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/25 font-mono">
              {thread.category}
            </span>
            <span className="text-xs text-gray-400 flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{new Date(thread.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-poppins font-extrabold text-white leading-tight">
            {thread.title}
          </h1>

          <div className="flex items-center space-x-3 pt-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-accent p-[1px]">
              <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-xs font-bold text-white uppercase">
                {thread.author.name
                  ? thread.author.name.substring(0, 2).toUpperCase()
                  : thread.author.username.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{thread.author.name || thread.author.username}</p>
              <p className="text-xs text-gray-400 font-light">@{thread.author.username}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-gray-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-light border-t border-border/30 pt-6">
          {thread.content}
        </div>

        {/* Actions bar */}
        <div className="flex items-center space-x-6 pt-4 border-t border-border/30 text-xs text-gray-400">
          <button
            onClick={() => isAuthenticated && likeMutation.mutate({ discussionId: thread.id })}
            disabled={!isAuthenticated || likeMutation.isPending}
            className={`flex items-center space-x-1.5 transition ${
              isAuthenticated ? 'hover:text-danger cursor-pointer' : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <Heart className="h-4 w-4" />
            <span>{thread._count?.likes ?? 0} Likes</span>
          </button>

          <div className="flex items-center space-x-1.5">
            <MessageSquare className="h-4 w-4" />
            <span>{totalComments} Comments</span>
          </div>
        </div>
      </article>

      {/* Add Root Comment Box */}
      <div className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4">
        <h3 className="text-base font-poppins font-bold text-white flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span>Join the Discussion</span>
        </h3>

        {commentError && (
          <div className="flex items-center space-x-2 bg-danger/10 border border-danger/30 text-danger text-xs p-3 rounded-lg">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{commentError}</span>
          </div>
        )}

        {isAuthenticated ? (
          <form onSubmit={handlePostRootComment} className="space-y-3">
            <textarea
              rows={3}
              placeholder="Share your thoughts, suggestions, or code approach..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-background border border-border/60 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-primary/80 transition resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={addCommentMutation.isPending || !commentText.trim()}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white gradient-btn flex items-center space-x-1.5 shadow disabled:opacity-40"
              >
                {addCommentMutation.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                <span>Post Comment</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 text-xs text-gray-400 space-y-2">
            <p>You must be signed in to post a comment or reply.</p>
            <Link
              href="/auth/login"
              className="inline-block px-4 py-2 rounded-lg text-xs font-semibold text-white gradient-btn"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-poppins font-bold text-white">
          Comments ({totalComments})
        </h3>

        {thread.comments.length === 0 ? (
          <div className="glass-panel p-8 text-center text-gray-500 rounded-2xl border border-border/20 text-xs">
            No comments posted yet. Be the first to share your insights!
          </div>
        ) : (
          thread.comments.map((comment) => (
            <div
              key={comment.id}
              className="glass-panel p-6 rounded-2xl border border-border/40 space-y-4 shadow-sm"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="h-7 w-7 rounded-full bg-card border border-border/60 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                    {comment.author.name
                      ? comment.author.name.substring(0, 2).toUpperCase()
                      : comment.author.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white">
                      {comment.author.name || comment.author.username}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comment Body */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light whitespace-pre-wrap">
                {comment.content}
              </p>

              {/* Comment Actions */}
              <div className="flex items-center space-x-4 text-xs text-gray-400 pt-2 border-t border-border/20">
                <button
                  onClick={() => isAuthenticated && likeMutation.mutate({ commentId: comment.id })}
                  disabled={!isAuthenticated}
                  className={`flex items-center space-x-1 hover:text-danger transition ${
                    !isAuthenticated ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span>{comment._count?.likes ?? 0}</span>
                </button>

                {isAuthenticated && (
                  <button
                    onClick={() => {
                      setReplyingToId(replyingToId === comment.id ? null : comment.id);
                      setReplyText('');
                    }}
                    className="flex items-center space-x-1 hover:text-primary transition"
                  >
                    <CornerDownRight className="h-3.5 w-3.5" />
                    <span>Reply</span>
                  </button>
                )}
              </div>

              {/* Reply Box if Active */}
              {replyingToId === comment.id && (
                <div className="pt-2 pl-4 border-l-2 border-primary/40 space-y-2">
                  <textarea
                    rows={2}
                    placeholder={`Reply to @${comment.author.username}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-background border border-border/60 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary/80 transition resize-none"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="px-3 py-1 rounded-lg text-xs text-gray-400 hover:text-white bg-card"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePostReply(comment.id)}
                      disabled={addCommentMutation.isPending || !replyText.trim()}
                      className="px-3 py-1 rounded-lg text-xs font-semibold text-white gradient-btn flex items-center space-x-1"
                    >
                      {addCommentMutation.isPending && <Loader2 className="h-3 w-3 animate-spin" />}
                      <span>Send Reply</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="space-y-3 pt-2 pl-4 border-l-2 border-border/40">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-card/40 p-3.5 rounded-xl border border-border/20 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-white">
                          {reply.author.name || reply.author.username}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 font-light whitespace-pre-wrap">
                        {reply.content}
                      </p>
                      <div className="flex items-center space-x-3 text-[10px] text-gray-400">
                        <button
                          onClick={() => isAuthenticated && likeMutation.mutate({ commentId: reply.id })}
                          disabled={!isAuthenticated}
                          className="flex items-center space-x-1 hover:text-danger"
                        >
                          <Heart className="h-3 w-3" />
                          <span>{reply._count?.likes ?? 0}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
