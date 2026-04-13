import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Spelling Bee Practice 🐝",
  description: "Learn synonyms and antonyms A to Z — a fun vocabulary game for kids!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-nunito)] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
