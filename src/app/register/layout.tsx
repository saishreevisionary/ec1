import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an Account',
  description: 'Join Venuss Herbo Aromatics to enjoy faster checkout, exclusive trade pricing, order tracking, and customized botanical formulations.',
  openGraph: {
    title: 'Register | Venuss Herbo Aromatics',
    description: 'Create your customer or wholesale account with Venuss Herbo Aromatics.',
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
