import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botanical Products & Natural Extracts Catalogue',
  description:
    'Discover authentic botanical ingredients across Essential Oils, Spice Oils, Spice Oleoresins, Floral Concretes, Floral Absolutes, and Spice Powders. Analytical GC-MS testing and bulk export packaging from Venuss Herbo Aromatics.',
  openGraph: {
    title: 'Natural Botanical Ingredients & Essential Oils | Venuss Herbo Aromatics',
    description:
      'Complete B2B product catalogue of authentic botanical extracts, essential oils, spice oleoresins, floral absolutes and spice powders manufactured in Tamil Nadu, India.',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
