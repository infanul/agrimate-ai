import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgriMate AI | Smart Agriculture & Farm Intelligence Platform',
  description: 'AI-powered crop health monitoring, soil analytics, weather advisories, and real-time market insights for modern agriculture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080e0c] text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
