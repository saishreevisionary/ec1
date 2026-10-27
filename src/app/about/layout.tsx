import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Venuss Herbo Aromatics — Botanical Distillation & Manufacturing',
  description:
    'Discover the heritage and manufacturing capabilities of Venuss Herbo Aromatics. Indian manufacturer of pure essential oils, spice oleoresins, floral absolutes, and sterilized spice powders since 1986.',
  openGraph: {
    title: 'About Venuss Herbo Aromatics — Nature, Extracted with Precision',
    description:
      'Learn about our family-owned heritage, steam distillation facilities, analytical QC laboratory, sustainable biomass energy, and global B2B supply footprint.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
