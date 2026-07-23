import React from 'react';
import Link from 'next/link';
import '../styles/globals.css';
import { AppProvider } from '../src/context/AppContext';

export const metadata = {
  title: 'Oops 😅',
  description: 'A tiny delight-first app for logging little mistakes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="min-h-screen text-white bg-bg"> 
            <header className="p-4 border-b border-white/5">
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                <h1 className="text-xl font-semibold">Oops 😅</h1>
                <nav className="space-x-4 text-sm text-neutral-300">
                  <Link href="/">Home</Link>
                  <Link href="/stats">Insights</Link>
                  <Link href="/settings">Settings</Link>
                </nav>
              </div>
            </header>
            <main className="max-w-3xl mx-auto p-6">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
