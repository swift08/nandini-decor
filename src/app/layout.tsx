import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nandini Decoration - Premium Event Decoration Services",
  description: "Transform your special moments with Nandini Decoration's luxury event decoration services. Wedding decor, birthday setups, corporate events, and more.",
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}