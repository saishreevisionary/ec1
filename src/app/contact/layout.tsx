import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Request a Quote',
  description:
    'Get in touch with Venuss Herbo Aromatics for bulk essential oil quotes, product samples, export inquiries, and custom botanical formulations. Our sales team responds within 24 hours.',
  openGraph: {
    title: 'Contact Venuss Herbo Aromatics — Request a Quote',
    description:
      'Reach out for bulk quotes, samples, export documentation, or custom formulations. ISO, HACCP & FSSAI certified manufacturer since 1986.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

