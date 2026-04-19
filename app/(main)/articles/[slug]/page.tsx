import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverApiClient } from "@/lib/serverApiClient";
import ArticleDetailClient from "./ArticleDetailClient";

interface ArticleResponse {
  success: boolean;
  data: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    metaTitle: string;
    metaDescription: string;
    thumbnailImage: string;
    author: string;
    publishedAt: string;
    tags: string[];
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await serverApiClient.get<ArticleResponse>(`/api/articles/slug/${slug}`, {
      cache: "force-cache", // Article details can be cached
    });

    if (!response.success || !response.data) {
      return {
        title: "Article Not Found | Lasvela",
      };
    }

    const article = response.data;

    return {
      title: article.metaTitle || `${article.title} | Lasvela`,
      description: article.metaDescription || article.excerpt,
      openGraph: {
        title: article.metaTitle || article.title,
        description: article.metaDescription || article.excerpt,
        images: [
          {
            url: article.thumbnailImage,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        type: "article",
        publishedTime: article.publishedAt,
        authors: [article.author || "Essen Team"],
      },
      twitter: {
        card: "summary_large_image",
        title: article.metaTitle || article.title,
        description: article.metaDescription || article.excerpt,
        images: [article.thumbnailImage],
      },
    };
  } catch (error) {
    return {
      title: "Article Detail | Lasvela",
    };
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let article = null;
  let latestArticles = [];

  try {
    // 1. Fetch current article
    const response = await serverApiClient.get<ArticleResponse>(`/api/articles/slug/${slug}`, {
      cache: "force-cache",
    });

    if (response.success && response.data) {
      article = response.data;
    }

    // 2. Fetch list for "Latest Articles" section (random 6)
    const listResponse = await serverApiClient.get<any>("/api/articles?limit=100", {
      cache: "force-cache",
    });

    if (listResponse.success && Array.isArray(listResponse.data)) {
      // Shuffle and take 6 (excluding the current article being viewed)
      const filtered = listResponse.data.filter((a: any) => a.slug !== slug);
      latestArticles = filtered.sort(() => 0.5 - Math.random()).slice(0, 6);
    }
  } catch (error) {
    console.error(`Error in ArticleDetailPage for [${slug}]:`, error);
  }

  if (!article) {
    notFound();
  }

  return <ArticleDetailClient article={article} latestArticles={latestArticles} />;
}

