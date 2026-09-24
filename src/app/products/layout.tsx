import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botanical Products & Essential Oils',
  description:
    'Explore our pure therapeutic essential oils, herbal hair oils, and organic extracts. Steam distilled and cold pressed in Tamil Nadu, India since 1986.',
  openGraph: {
    title: 'Pure Essential Oils & Herbal Extracts | Venuss Herbo Aromatics',
    description:
      'Shop premium, lab-tested herbal oils, hair care formulations, and therapeutic essential oils direct from the distillers.',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
