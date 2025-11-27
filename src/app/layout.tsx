import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nandini Decoration - Premium Event Decoration Services",
  description: "Transform your special moments with Nandini Decoration's luxury event decoration services. Wedding decor, birthday setups, corporate events, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}