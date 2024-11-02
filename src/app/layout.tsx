import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import AnimateProvider from "@/providers/AOS";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lunas Diary",
  description: "A Journey Through Words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <QueryProvider>
            <AnimateProvider>
              {children}
            </AnimateProvider>
          </QueryProvider>
      </body>
    </html>
  );
}
