import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import Link from 'next/link';
import NavbarClient from '../components/NavbarClient';

export const metadata: Metadata = {
  title: 'CodeJudge - Premium Competitive Programming Platform',
  description: 'Enterprise-grade online compiler, competitive programming arena, and community forum.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-white min-h-screen flex flex-col font-inter antialiased">
        <Providers>
          {/* Header Navigation */}
          <header className="sticky top-0 z-50 glass-panel border-b border-border/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="font-poppins font-extrabold text-2xl tracking-tight gradient-text">
                    CodeJudge
                  </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-1">
                  <Link href="/problems" className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition font-medium">
                    Problems
                  </Link>
                  <Link href="/roadmap" className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition font-medium">
                    Roadmap
                  </Link>
                  <Link href="/sheets" className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition font-medium">
                    Sheets
                  </Link>
                  <Link href="/contests" className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition font-medium">
                    Contests
                  </Link>
                  <Link href="/discussions" className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition font-medium">
                    Discussions
                  </Link>
                  <Link href="/leaderboard" className="px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition font-medium">
                    Leaderboard
                  </Link>
                </nav>
              </div>

              {/* Dynamic client auth buttons */}
              <NavbarClient />
            </div>
          </header>

          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border/20 py-8 bg-background">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-xs">
              <p>&copy; {new Date().getFullYear()} CodeJudge. Built with standard-setting engineering for elite programmers.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
