import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles & Inspiration",
  description: "Stay inspired with Lasvela's articles on interior design, design trends, and home styling tips. Discover how to illuminate your living space.",
  openGraph: {
    title: "Articles & Inspiration",
    description: "Stay inspired with Lasvela's articles on interior design, design trends, and home styling tips. Discover how to illuminate your living space.",
    url: "https://lasvela.sg/articles",
    images: [
      {
        url: "/favicon.ico",
        width: 32,
        height: 32,
        alt: "Lasvela Logo",
      },
    ],
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
