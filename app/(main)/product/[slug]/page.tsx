import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverApiClient } from "@/lib/serverApiClient";
import ProductDetailClient from "./ProductDetailClient";
import type { Product } from "@/lib/db/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const response = await serverApiClient.get<{ success: boolean; data: Product }>(`/api/products/slug/${slug}`, {
      cache: "force-cache",
    });

    if (!response.success || !response.data) {
      return {
        title: "Product Not Found",
      };
    }

    const product = response.data;
    const ogImage = (product.images && product.images.length > 0) 
      ? product.images[0] 
      : product.thumbnailImage;

    return {
      title: `${product.name} | LASVELA`,
      description: product.description?.substring(0, 160) || `Buy ${product.name} at Lasvela.`,
      openGraph: {
        title: `${product.name} | LASVELA`,
        description: product.description || `Buy ${product.name} at Lasvela.`,
        url: `https://lasvela.sg/product/${slug}`,
        siteName: "Lasvela",
        images: ogImage ? [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: product.name,
          }
        ] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description || `Buy ${product.name} at Lasvela.`,
        images: ogImage ? [ogImage] : [],
      },
    };
  } catch (error) {
    return {
      title: "Product Detail",
    };
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let product = null;

  try {
    const response = await serverApiClient.get<{ success: boolean; data: Product }>(`/api/products/slug/${slug}`, {
      cache: "force-cache",
    });

    if (response.success && response.data) {
      product = response.data;
    }
  } catch (error) {
    console.error(`Error in ProductDetailPage for [${slug}]:`, error);
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient initialProduct={product} />;
}
