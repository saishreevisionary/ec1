'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Leaf, ArrowRight, ArrowLeft, X, Sparkles } from 'lucide-react';

interface TourStep {
  targetId: string;
  title: string;
  content: string;
  placement: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-center';
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'tour-logo',
    title: '🌿 Welcome to NATURELLE',
    content: 'We offer premium botanical hair care formulated with pure, cold-pressed ingredients for strong, healthy hair.',
    placement: 'bottom-left'
  },
  {
    targetId: 'tour-categories',
    title: '🛍️ Curated Collections',
    content: 'Explore our specialized ranges, from organic Botanical Oils to Active Serums and Scalp Therapy sets.',
    placement: 'bottom-center'
  },
  {
    targetId: 'tour-search',
    title: '🔍 Smart Search Bar',
    content: 'Looking for a specific treatment or ingredient? Type it here to instantly filter our inventory.',
    placement: 'bottom-center'
  },
  {
    targetId: 'tour-account',
    title: '👤 Customer & Admin Portal',
    content: 'Sign in to track orders. Admins logging in using admin credentials automatically access the dashboard.',
    placement: 'bottom-right'
  },
  {
    targetId: 'tour-cart',
    title: '🛒 Wishlist & Cart Actions',
    content: 'Save favorites to your wishlist, manage your items, and enjoy our seamless checkout experience.',
    placement: 'bottom-right'
  }
];

export const GuidedTour = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  
  const [tooltipStyle, setTooltipStyle] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const tooltipRef = useRef<HTMLDivElement>(null);

  // Start the tour
  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  // Skip or close the tour
  const endTour = () => {
    setIsActive(false);
    setHighlightStyle(null);
  };

  // Trigger automatically once on first load
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('naturelle_tour_seen');
    if (!hasSeenTour) {
      // Small timeout to let initial page hydration finish
      const timer = setTimeout(() => {
        startTour();
        localStorage.setItem('naturelle_tour_seen', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Recalculate spotlight and tooltip positioning when active element/step changes
  useEffect(() => {
    if (!isActive) return;

    const updatePosition = () => {
      const step = TOUR_STEPS[currentStep];
      const targetElement = document.getElementById(step.targetId);

      if (!targetElement) {
        // If element is not rendered on this specific screen size, skip to next step
        handleNextStep();
        return;
      }

      // Scroll targeted element into view smoothly if not fully visible
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Small delay to let scroll finish before taking measurements
      setTimeout(() => {
        const rect = targetElement.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        // Position highlight spotlight with comfortable padding
        const padding = 8;
        const highlight = {
          top: rect.top + scrollY - padding,
          left: rect.left + scrollX - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        };

        setHighlightStyle(highlight);

        // Position Tooltip relative to the highlight box
        let tooltipTop = highlight.top + highlight.height + 14;
        let tooltipLeft = highlight.left + highlight.width / 2;

        if (tooltipRef.current) {
          const tooltipRect = tooltipRef.current.getBoundingClientRect();
          
          // Adjust placement shifts
          if (step.placement === 'bottom-left') {
            tooltipLeft = highlight.left;
          } else if (step.placement === 'bottom-right') {
            tooltipLeft = highlight.left + highlight.width - tooltipRect.width;
          } else { // Center
            tooltipLeft = highlight.left + highlight.width / 2 - tooltipRect.width / 2;
          }

          // Top Placement if needed
          if (step.placement === 'top-center') {
            tooltipTop = highlight.top - tooltipRect.height - 14;
          }

          // Bounds protection to keep tooltip within the viewport
          const paddingMargin = 15;
          const maxLeft = window.innerWidth - tooltipRect.width - paddingMargin;
          tooltipLeft = Math.max(paddingMargin, Math.min(tooltipLeft, maxLeft));
          
          const maxTop = window.innerHeight - tooltipRect.height - paddingMargin;
          tooltipTop = Math.max(paddingMargin, tooltipTop);
        }

        setTooltipStyle({
          top: tooltipTop,
          left: tooltipLeft
        });
      }, 350);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isActive, currentStep]);

  const handleNextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      endTour();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const activeStepInfo = TOUR_STEPS[currentStep];

  return (
    <>
      {/* FLOATING TOUR TRIGGER BUTTON */}
      <button 
        onClick={startTour} 
        className="fixed bottom-6 right-6 p-3.5 bg-[#2d4a3e] hover:bg-[#20352c] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 z-40 group flex items-center gap-2 cursor-pointer border border-[#b58c54]/15"
        title="Start Guided Tour"
      >
        <Leaf className="w-5 h-5 text-accent animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 ease-in-out text-[10px] font-bold uppercase tracking-wider leading-none">How to Use</span>
      </button>

      {/* TOUR GUIDE INTERFACE OVERLAY */}
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[9990]">
          
          {/* Spotlight overlay masking */}
          {highlightStyle && (
            <div 
              className="absolute rounded-xl border border-[#b58c54]/20 shadow-[0_0_0_9999px_rgba(11,44,36,0.65)] transition-all duration-500 pointer-events-none ease-out"
              style={{
                top: `${highlightStyle.top}px`,
                left: `${highlightStyle.left}px`,
                width: `${highlightStyle.width}px`,
                height: `${highlightStyle.height}px`
              }}
            ></div>
          )}

          {/* Floating glassmorphic tooltip card */}
          <div 
            ref={tooltipRef}
            className="absolute bg-white/95 backdrop-blur-md border border-[#b58c54]/25 shadow-2xl rounded-2xl p-5 w-80 max-w-[90vw] pointer-events-auto transition-all duration-500 z-[9995] animate-[fade-in-up_0.4s_ease-out_forwards] flex flex-col space-y-4"
            style={{
              top: `${tooltipStyle.top}px`,
              left: `${tooltipStyle.left}px`
            }}
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[9px] font-bold text-[#b58c54] uppercase tracking-widest">
                Step {currentStep + 1} of {TOUR_STEPS.length}
              </span>
              <button 
                onClick={endTour} 
                className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Instruction Content */}
            <div className="space-y-1.5">
              <h5 className="font-serif text-primary text-sm font-bold tracking-tight">
                {activeStepInfo.title}
              </h5>
              <p className="text-slate-500 text-xs font-light leading-relaxed">
                {activeStepInfo.content}
              </p>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-1">
              <button 
                onClick={endTour}
                className="text-[10px] font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                Skip Guide
              </button>

              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button 
                    onClick={handlePrevStep}
                    className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                )}

                <button 
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-[#2d4a3e] hover:bg-[#20352c] text-white rounded-lg text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-95"
                >
                  <span>{currentStep === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}</span>
                  {currentStep === TOUR_STEPS.length - 1 ? (
                    <Sparkles className="w-3 h-3 text-accent" />
                  ) : (
                    <ArrowRight className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default GuidedTour;
