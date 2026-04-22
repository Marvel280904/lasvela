import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LASVELA Singapore | Illuminating Life, Crafting Home",
    template: "%s | LASVELA"
  },
  description: "Experience the art of living with Lasvela. Premium furniture store in Singapore offering stylish, high-quality furniture for modern living spaces.",
  keywords: ["furniture", "luxury furniture", "premium furniture", "best furniture", "Singapore", "interior design", "home decor", "lasvela", "singapore furniture", "living room", "dining room", "bedroom"],
  authors: [{ name: "Lasvela Team" }],
  creator: "Lasvela",
  publisher: "Lasvela",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://lasvela.sg",
    siteName: "Lasvela",
    title: "LASVELA Singapore | Illuminating Life, Crafting Home",
    description: "Experience the art of living with Lasvela. Premium furniture store in Singapore offering stylish, high-quality furniture for modern living spaces.",
    images: [
      {
        url: "/favicon.ico",
        width: 32,
        height: 32,
        alt: "Lasvela Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LASVELA Singapore | Illuminating Life, Crafting Home",
    description: "Experience the art of living with Lasvela. Premium furniture store in Singapore offering stylish, high-quality furniture for modern living spaces.",
    images: ["/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
