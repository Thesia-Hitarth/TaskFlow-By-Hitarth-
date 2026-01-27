import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Configure Inter font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TaskFlow - Modern Task Management',
  description: 'Organize your work and amplify your productivity with TaskFlow',
  keywords: ['task management', 'productivity', 'calendar', 'todo'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}