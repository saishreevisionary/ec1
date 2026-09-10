'use client';

import React from 'react';

interface HairOilLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  label?: string;
}

const HairOilLoader = ({
  size = 'md',
  fullPage = false,
  label,
}: HairOilLoaderProps) => {
  const px = {
    sm: 90,
    md: 140,
    lg: 190,
  }[size];

  const displayLabel = label ?? (size !== 'sm' ? 'Crafting your elixir…' : undefined);

  const scene = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', userSelect: 'none' }}>
      <style>{`
        /* ── make transform-origin work relative to each element's own bounding box ── */
        .nol-bottle {
          transform-box: fill-box;
          transform-origin: center 90%;
          animation: nol-tilt 3.2s ease-in-out infinite;
        }
        @keyframes nol-tilt {
          0%,  12%  { transform: rotate(0deg); }
          28%, 62%  { transform: rotate(-42deg); }
          82%, 100% { transform: rotate(0deg); }
        }

        /* drops fall from the bottle tip down toward the hand */
        .nol-drop-1 {
          transform-box: fill-box;
          transform-origin: center top;
          animation: nol-drop1 3.2s ease-in infinite;
        }
        .nol-drop-2 {
          transform-box: fill-box;
          transform-origin: center top;
          animation: nol-drop2 3.2s ease-in infinite;
        }
        .nol-drop-3 {
          transform-box: fill-box;
          transform-origin: center top;
          animation: nol-drop3 3.2s ease-in infinite;
        }
        @keyframes nol-drop1 {
          0%,  18%  { opacity: 0; transform: translateY(0px)  scale(1); }
          26%        { opacity: 1; transform: translateY(4px)  scale(1); }
          52%        { opacity: 1; transform: translateY(62px) scale(1.1); }
          62%, 100%  { opacity: 0; transform: translateY(78px) scale(0.4); }
        }
        @keyframes nol-drop2 {
          0%,  26%  { opacity: 0; transform: translateY(0px)  scale(1); }
          36%        { opacity: 1; transform: translateY(4px)  scale(1); }
          58%        { opacity: 1; transform: translateY(62px) scale(1.1); }
          68%, 100%  { opacity: 0; transform: translateY(78px) scale(0.4); }
        }
        @keyframes nol-drop3 {
          0%,  36%  { opacity: 0; transform: translateY(0px)  scale(1); }
          46%        { opacity: 1; transform: translateY(4px)  scale(1); }
          65%        { opacity: 1; transform: translateY(62px) scale(1.1); }
          75%, 100%  { opacity: 0; transform: translateY(78px) scale(0.4); }
        }

        /* hand fades in after drops start falling */
        .nol-hand {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: nol-hand 3.2s ease-in-out infinite;
        }
        @keyframes nol-hand {
          0%,  38%  { opacity: 0; transform: translateY(12px); }
          55%        { opacity: 1; transform: translateY(0px); }
          88%        { opacity: 1; transform: translateY(0px); }
          100%       { opacity: 0; transform: translateY(6px); }
        }

        /* gold ripple on palm when oil lands */
        .nol-ripple {
          transform-box: fill-box;
          transform-origin: center;
          animation: nol-ripple 3.2s ease-out infinite;
        }
        @keyframes nol-ripple {
          0%,  55%  { transform: scale(0);   opacity: 0; }
          68%        { transform: scale(0.5); opacity: 0.6; }
          88%        { transform: scale(1);   opacity: 0.15; }
          100%       { transform: scale(1.2); opacity: 0; }
        }

        /* small gloss dot on the oil */
        .nol-gloss {
          animation: nol-gloss 3.2s ease-in-out infinite;
        }
        @keyframes nol-gloss {
          0%,  55%  { opacity: 0; }
          70%        { opacity: 0.55; }
          88%        { opacity: 0.35; }
          100%       { opacity: 0; }
        }
      `}</style>

      <svg
        width={px}
        height={Math.round(px * 1.55)}
        viewBox="0 0 160 248"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ════════════════════════════════════
             BOTTLE  (pivot = bottom‑centre of body)
             Positioned left-centre so when it tilts -42° the nozzle
             swings rightward over the dropping zone.
        ════════════════════════════════════ */}
        <g className="nol-bottle" transform="translate(30, 10)">
          {/* Squeeze bulb */}
          <ellipse cx="42" cy="14" rx="12" ry="10" fill="#4a7a65" />
          <ellipse cx="38" cy="11" rx="4"  ry="3"  fill="#ffffff25" />
          {/* Neck */}
          <rect x="38" y="22" width="8" height="16" rx="4" fill="#3d6355" />
          {/* Nozzle tip */}
          <ellipse cx="42" cy="22" rx="5" ry="3.5" fill="#2d4a3e" />
          {/* Shoulder curve */}
          <path d="M22 50 Q22 38 30 34 L38 34 L38 38 Q30 40 28 50Z" fill="#2d4a3e" />
          <path d="M62 50 Q62 38 54 34 L46 34 L46 38 Q54 40 56 50Z" fill="#2d4a3e" />
          {/* Body */}
          <rect x="22" y="48" width="40" height="58" rx="10" fill="#2d4a3e" />
          {/* Label plate */}
          <rect x="27" y="58" width="30" height="20" rx="5" fill="#ffffff12" />
          <line x1="30" y1="65" x2="54" y2="65" stroke="#ffffff40" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="30" y1="71" x2="54" y2="71" stroke="#ffffff30" strokeWidth="1.0" strokeLinecap="round" />
          {/* Shine stripe */}
          <rect x="25" y="52" width="6" height="30" rx="3" fill="#ffffff10" />
          {/* Bottom dome */}
          <ellipse cx="42" cy="106" rx="20" ry="6" fill="#243d30" />
        </g>

        {/* ════════════════════════════════════
             OIL DROPS — fall from ~x=88 (nozzle tip after tilt) downward
             They start at y≈28 and travel to y≈110 (palm)
        ════════════════════════════════════ */}
        {/* Drop 1 */}
        <g className="nol-drop-1">
          <path d="M86 28 Q83 34 83 38 Q83 44 86 44 Q89 44 89 38 Q89 34 86 28Z" fill="#b58c54" />
          <ellipse cx="85" cy="34" rx="1.2" ry="2" fill="#d4aa7080" />
        </g>
        {/* Drop 2 */}
        <g className="nol-drop-2">
          <path d="M92 28 Q89 35 89 40 Q89 46 92 46 Q95 46 95 40 Q95 35 92 28Z" fill="#b58c54" />
          <ellipse cx="91" cy="35" rx="1.2" ry="2.2" fill="#d4aa7080" />
        </g>
        {/* Drop 3 */}
        <g className="nol-drop-3">
          <path d="M98 28 Q95 34 95 38 Q95 43 98 43 Q101 43 101 38 Q101 34 98 28Z" fill="#c4934c" />
          <ellipse cx="97" cy="34" rx="1"   ry="1.8" fill="#d4aa7080" />
        </g>

        {/* ════════════════════════════════════
             HAND — palm facing up, centred in lower half
        ════════════════════════════════════ */}
        <g className="nol-hand">
          {/* Ripple under oil drop impact */}
          <ellipse className="nol-ripple" cx="90" cy="156" rx="34" ry="11" fill="#b58c54" />

          {/* ── FINGERS (all palm-up, pointing upward) ── */}
          {/* Pinky — far left */}
          <rect x="53" y="120" width="11" height="38" rx="5.5" fill="#d4956e" />
          {/* Ring */}
          <rect x="66" y="112" width="12" height="46" rx="6"   fill="#d4956e" />
          {/* Middle — tallest */}
          <rect x="80" y="107" width="13" height="51" rx="6.5" fill="#d4956e" />
          {/* Index */}
          <rect x="95" y="113" width="12" height="45" rx="6"   fill="#d4956e" />
          {/* Thumb — angled */}
          <path d="M109 148 Q116 140 117 132 Q117 124 112 121 Q107 120 105 126 L104 148Z" fill="#d4956e" />

          {/* ── PALM BASE ── */}
          <rect x="53" y="150" width="64" height="34" rx="12" fill="#d4956e" />

          {/* Knuckle highlights */}
          <ellipse cx="58"  cy="154" rx="4.5" ry="2.5" fill="#c07850" opacity="0.3" />
          <ellipse cx="72"  cy="152" rx="5"   ry="2.5" fill="#c07850" opacity="0.3" />
          <ellipse cx="86"  cy="150" rx="5.5" ry="2.5" fill="#c07850" opacity="0.3" />
          <ellipse cx="101" cy="152" rx="5"   ry="2.5" fill="#c07850" opacity="0.3" />

          {/* Palm crease lines */}
          <path d="M57 165 Q85 161 113 165" stroke="#b07050" strokeWidth="1.2" fill="none" opacity="0.35" strokeLinecap="round" />
          <path d="M59 173 Q85 170 111 173" stroke="#b07050" strokeWidth="0.9" fill="none" opacity="0.25" strokeLinecap="round" />

          {/* Oil pool on palm */}
          <ellipse className="nol-gloss" cx="90" cy="157" rx="14" ry="5.5" fill="#d4aa70" />
          <ellipse className="nol-gloss" cx="87" cy="155" rx="5"  ry="2"   fill="#f0cc88" />
        </g>
      </svg>

      {displayLabel && (
        <p style={{
          fontSize: size === 'lg' ? '11px' : size === 'md' ? '9.5px' : '8px',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          color: '#2d4a3e',
          letterSpacing: '0.06em',
          opacity: 0.65,
          marginTop: '-2px',
        }}>
          {displayLabel}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {scene}
      </div>
    );
  }

  return scene;
};

export default HairOilLoader;
