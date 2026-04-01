import type { Metadata } from "next";
import { Michroma, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const michroma = Michroma({
  weight: "400",
  variable: "--font-michroma",
  subsets: ["latin"],
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lasvela - Illuminating Life",
  description: "Bringing life to Lighting Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${michroma.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-michroma">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
