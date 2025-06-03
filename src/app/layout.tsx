import type { Metadata } from 'next';
import './globals.css';
import { AppContextProvider } from '@/contexts/AppContextProvider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TranslatorHub',
  description: 'Admin panel and dashboard for translators',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Removed Google Fonts links as next/font is preferred for Inter */}
      </head>
      <body className="font-body antialiased">
        <AppContextProvider>
          {children}
          <Toaster />
        </AppContextProvider>
      </body>
    </html>
  );
}
