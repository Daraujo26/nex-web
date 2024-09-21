import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter-Italic-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Nex Package Manager",
  description: "Distributed package manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
