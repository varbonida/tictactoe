import type { Metadata } from "next";
import { Bagel_Fat_One, Fredoka } from "next/font/google";
import "./globals.css";

const body = Fredoka({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Bagel_Fat_One({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
  description: "Challenge your friends in this classic game!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
