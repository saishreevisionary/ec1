import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/seedData';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Monograph | Venuss Herbo Aromatics',
      description: 'Explore analytical specifications and botanical profiles from Venuss Herbo Aromatics.',
    };
  }

  const botanicalName = product.botanical_name ? ` (${product.botanical_name})` : '';
  const range = product.product_range || 'Botanical Extract';

  return {
    title: `${product.name}${botanicalName} — Technical Specification & COA`,
    description: `${product.description} Available in bulk packaging options with verified GC-MS analytical profiles. Direct manufacturer supply from Venuss Herbo Aromatics.`,
    openGraph: {
      title: `${product.name} | Venuss Herbo Aromatics`,
      description: `B2B technical specifications, botanical monographs, and quotation requests for ${product.name}. Extraction method: ${product.extraction_method || 'Pure Natural Extraction'}.`,
      images: [product.image_url || '/images/botanical-hero.jpg'],
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
