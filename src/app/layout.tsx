import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';
import GuidedTour from '@/components/GuidedTour';
import CartFlightManager from '@/components/CartFlightManager';
import RoleSwitcher from '@/components/RoleSwitcher';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: {
    template: '%s | Venuss Herbo Aromatics',
    default: 'Venuss Herbo Aromatics — Premium Essential Oils & Botanical Extracts',
  },
  description:
    'India\'s premier manufacturer and exporter of Essential Oils, Spice Oleoresins, Floral Absolutes, and Sterilized Spice Powders. Supplying the global Flavor, Fragrance, Food, and Personal Care industries since 1986.',
  keywords: [
    'essential oils', 'botanical extracts', 'spice oleoresins', 'floral absolutes',
    'aroma chemicals', 'natural extracts', 'herbal aromatics', 'Venuss Herbo Aromatics',
    'India essential oil manufacturer', 'export essential oils', 'bulk essential oils',
  ],
  openGraph: {
    title: 'Venuss Herbo Aromatics — Premium Essential Oils & Botanical Extracts',
    description:
      'Manufacturer and exporter of 100% pure essential oils, spice oleoresins, and botanical extracts. ISO, HACCP & FSSAI certified. Established 1986.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Venuss Herbo Aromatics',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased bg-white selection:bg-accent selection:text-white">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <CartDrawer />
                <GuidedTour />
                <CartFlightManager />
                <RoleSwitcher />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
