import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Lasvela, our mission, and our passion for creating premium furniture and lighting solutions that illuminate your life.",
  openGraph: {
    title: "About Us",
    description: "Learn more about Lasvela, our mission, and our passion for creating premium furniture and lighting solutionsthat illuminate your life.",
    url: "https://lasvela.sg/about",
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

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
