import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "x7rG Enterprise — Recibo digital",
  description: "Una experiencia de impresión digital para celebrar un trabajo bien hecho.",
  icons: {
    icon: "/favicon-x7rg.png",
    shortcut: "/favicon-x7rg.png",
  },
  openGraph: {
    title: "x7rG Enterprise — Recibo digital",
    description: "Una pequeña prueba de un gran trabajo.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-ES"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
