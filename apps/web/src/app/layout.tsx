import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/footer';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Randomface',
  description: 'Vector faces generator focused on uniqueness',
  metadataBase: new URL('https://randomface.lefelys.com'),
  keywords: ['face', 'generator', 'js', 'react'],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    googleBot: 'index, follow',
  },
  openGraph: {
    siteName: 'Randomface',
    type: 'website',
    locale: 'en_US',
  },
  applicationName: 'Randomface',
  appleWebApp: {
    title: 'Randomface',
    statusBarStyle: 'default',
    capable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('font-sans antialiased relative', fontSans.variable)}>
        <div className='flex min-h-screen flex-col container bg-background px-5 md:px-24 lg:px-52'>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className='flex-1'>{children}</main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
