import React from 'react';
import Link from 'next/link';
import { Terminal, Cpu, Award, Users, ArrowRight, Zap, Code } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-24 py-12">
      {/* Hero section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-2 animate-pulse">
          <Zap className="h-3 w-3" />
          <span>Supercharged by Gemini 2.5 AI</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-poppins font-extrabold tracking-tight leading-tight">
          Where Elite Coders <br />
          <span className="gradient-text">Forge Their Skills.</span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light">
          An enterprise-level competitive programming platform featuring isolated sandboxes, AI code reviews, and live ACM-ICPC matches.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/problems"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white gradient-btn text-center shadow-lg transition flex items-center justify-center space-x-2"
          >
            <span>Solve Challenges</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/contests"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-gray-300 hover:text-white glass-card text-center hover:bg-white/10 transition flex items-center justify-center space-x-2"
          >
            <span>Enter Arenas</span>
            <Terminal className="h-5 w-5 text-primary" />
          </Link>
        </div>
      </section>

      {/* Grid statistics display */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {[
          { label: 'Runtimes Support', value: '8 Languages' },
          { label: 'Average Execution', value: '< 20ms' },
          { label: 'Active Contests', value: '24/7 Live' },
          { label: 'Sandbox Isolation', value: '100% Secure' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-6 text-center border border-border/20 rounded-2xl">
            <p className="text-3xl font-bold font-poppins text-white">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Key features grid */}
      <section className="w-full max-w-6xl space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-poppins font-extrabold">Engineered for Peak Performance</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">Explore features designed to scale from classroom practice to international Olympiads.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card p-8 flex flex-col space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-poppins">Secure Sandbox</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Submit code safely. All submissions compile and execute inside hardened, non-networked Docker runtimes with strict CPU cores, memory limits, and pids protection.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 flex flex-col space-y-4">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-poppins">AI Code Architect</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Integrate Google Gemini to review your solutions. Get instant feedback on edge cases, O(N) complexity analytics, and structural cleanups.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 flex flex-col space-y-4">
            <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center text-success border border-success/20">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-poppins">ICPC Contest Engines</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Compete in standard formats. Calculate penalty points, register for public/private arenas, and view automated leaderboards calculated on test case completions.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section CTA */}
      <section className="w-full max-w-6xl rounded-3xl p-8 md:p-12 glass-panel border border-border/60 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/5 pointer-events-none" />
        <div className="space-y-4 max-w-xl relative z-10">
          <h2 className="text-3xl font-poppins font-extrabold leading-tight">Join the Arena. <br />Level Up Your Code.</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Collaborate in general discussion channels, check out editorials for hard algorithms, comment on solution threads, and bookmark problems to solve later.
          </p>
        </div>
        <Link
          href="/auth/register"
          className="relative z-10 px-8 py-4 bg-white text-background font-bold rounded-xl hover:bg-gray-100 transition shadow-lg flex items-center space-x-2 shrink-0"
        >
          <span>Create Free Account</span>
          <Users className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
