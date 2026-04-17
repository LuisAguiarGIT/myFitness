import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';
import SideNav from '@/components/SideNav';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My fitness',
  description: 'My personal tracker app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 min-h-0">
          <SideNav />
          <main className="flex-1 min-h-0 overflow-y-auto p-6 bg-[#0E0E0E]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
