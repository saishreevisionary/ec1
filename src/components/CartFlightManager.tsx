'use client';

import React, { useState, useEffect } from 'react';

interface FlyingItem {
  id: number;
  imageUrl: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  type: 'cart' | 'wishlist';
}

export const CartFlightManager = () => {
  const [flights, setFlights] = useState<FlyingItem[]>([]);

  useEffect(() => {
    const handleFlyEvent = (e: Event, type: 'cart' | 'wishlist') => {
      const customEvent = e as CustomEvent<{
        imageUrl: string;
        startX: number;
        startY: number;
      }>;

      if (!customEvent.detail) return;

      const { imageUrl, startX, startY } = customEvent.detail;
      const targetId = type === 'cart' ? 'tour-cart' : 'tour-wishlist';
      const targetIcon = document.getElementById(targetId);
      
      let endX = window.innerWidth - 100;
      let endY = 40;

      if (targetIcon) {
        const rect = targetIcon.getBoundingClientRect();
        endX = rect.left + rect.width / 2;
        endY = rect.top + rect.height / 2;
      }

      const newFlight: FlyingItem = {
        id: Date.now() + Math.random(),
        imageUrl,
        startX,
        startY,
        endX,
        endY,
        type
      };

      setFlights((prev) => [...prev, newFlight]);

      // Trigger impact event when the flight completes (850ms)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(`${type}-impact`));
        // Clean up flight entry
        setFlights((prev) => prev.filter((f) => f.id !== newFlight.id));
      }, 850);
    };

    const onCartFly = (e: Event) => handleFlyEvent(e, 'cart');
    const onWishlistFly = (e: Event) => handleFlyEvent(e, 'wishlist');

    window.addEventListener('cart-item-fly', onCartFly);
    window.addEventListener('wishlist-item-fly', onWishlistFly);

    return () => {
      window.removeEventListener('cart-item-fly', onCartFly);
      window.removeEventListener('wishlist-item-fly', onWishlistFly);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fly-x {
          0% { transform: translateX(var(--start-x)); }
          100% { transform: translateX(var(--end-x)); }
        }
        @keyframes fly-y {
          0% { top: var(--start-y); }
          100% { top: var(--end-y); }
        }
        @keyframes scale-down {
          0% { transform: scale(1); opacity: 1; }
          80% { transform: scale(0.65); opacity: 0.9; }
          100% { transform: scale(0.1); opacity: 0; }
        }
      `}</style>

      {flights.map((item) => (
        <div
          key={item.id}
          style={{
            '--start-x': `${item.startX}px`,
            '--start-y': `${item.startY}px`,
            '--end-x': `${item.endX}px`,
            '--end-y': `${item.endY}px`,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '40px',
            height: '40px',
            zIndex: 99999,
            pointerEvents: 'none',
            borderRadius: '9999px',
            border: item.type === 'cart' ? '2px solid #b58c54' : '2px solid #ec4899',
            background: 'white',
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            animation: 'fly-x 0.85s linear forwards, fly-y 0.85s cubic-bezier(0.06, 0.97, 0.61, 1) forwards, scale-down 0.85s ease-in forwards'
          } as React.CSSProperties}
        >
          <img
            src={item.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </>
  );
};

export default CartFlightManager;
