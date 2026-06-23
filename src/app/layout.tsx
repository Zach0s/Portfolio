import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GeometricBackground from "@/components/GeometricBackground";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zacharie Rodde — Développeur Full Stack",
  description:
    "Portfolio de Zacharie Rodde, développeur logiciel et fullstack, étudiant en 4ème année à Epitech Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <GeometricBackground />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
