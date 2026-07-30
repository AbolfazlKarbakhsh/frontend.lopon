import React from 'react';

export default function FemaleAvatarSVG({ className = "w-full h-full" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Soft background gradient */}
        <linearGradient id="fem-bg-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF0F3" />
          <stop offset="0.5" stopColor="#FFE4E9" />
          <stop offset="1" stopColor="#FFD1DC" />
        </linearGradient>

        {/* Elegant dark hair gradient */}
        <linearGradient id="fem-hair-grad" x1="30" y1="20" x2="90" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A1428" />
          <stop offset="0.6" stopColor="#481C3D" />
          <stop offset="1" stopColor="#1C0B1B" />
        </linearGradient>

        {/* Glowing hair highlight */}
        <linearGradient id="fem-hair-shine" x1="40" y1="25" x2="70" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B4882" stopOpacity="0.6" />
          <stop offset="1" stopColor="#481C3D" stopOpacity="0" />
        </linearGradient>

        {/* Skin tone gradient */}
        <linearGradient id="fem-skin-grad" x1="40" y1="35" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDDFD0" />
          <stop offset="1" stopColor="#F5C7B3" />
        </linearGradient>

        {/* Lopon Rose dress gradient */}
        <linearGradient id="fem-dress-grad" x1="20" y1="85" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2D55" />
          <stop offset="1" stopColor="#D91B42" />
        </linearGradient>

        {/* Soft drop shadow */}
        <filter id="fem-shadow" x="15" y="15" width="90" height="98" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#FF2D55" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Circle Background */}
      <circle cx="60" cy="60" r="58" fill="url(#fem-bg-grad)" />

      <g filter="url(#fem-shadow)">
        {/* Back Hair */}
        <path
          d="M30 52C28 68 32 88 40 102H80C88 88 92 68 90 52C90 38 82 20 60 20C38 20 30 38 30 52Z"
          fill="url(#fem-hair-grad)"
        />

        {/* Shoulders / Dress */}
        <path
          d="M24 112C24 95 38 86 60 86C82 86 96 95 96 112V120H24V112Z"
          fill="url(#fem-dress-grad)"
        />

        {/* Neck */}
        <path
          d="M52 70C52 77 55.5 82 60 82C64.5 82 68 77 68 70V60H52V70Z"
          fill="url(#fem-skin-grad)"
        />

        {/* Face */}
        <path
          d="M40 48C40 63 49 73 60 73C71 73 80 63 80 48C80 36 71 32 60 32C49 32 40 36 40 48Z"
          fill="url(#fem-skin-grad)"
        />

        {/* Cheeks blush */}
        <circle cx="48" cy="55" r="4.5" fill="#FF2D55" fillOpacity="0.2" />
        <circle cx="72" cy="55" r="4.5" fill="#FF2D55" fillOpacity="0.2" />

        {/* Eyes (Elegant curved eyelashes) */}
        <path d="M46 47C48 45 53 45 55 47" stroke="#2A1428" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M65 47C67 45 72 45 74 47" stroke="#2A1428" strokeWidth="2.2" strokeLinecap="round" />

        {/* Eyebrows */}
        <path d="M45 42C48 40.5 53 41.5 55 43" stroke="#481C3D" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M65 43C67 41.5 72 40.5 75 42" stroke="#481C3D" strokeWidth="1.6" strokeLinecap="round" />

        {/* Lips */}
        <path d="M55 61C57 63.5 63 63.5 65 61" fill="#FF2D55" />
        <path d="M55 61C57 63 63 63 65 61" stroke="#D91B42" strokeWidth="1.2" strokeLinecap="round" />

        {/* Front Hair / Bangs & Waves */}
        <path
          d="M36 46C34 32 45 20 60 20C75 20 86 32 84 46C82 38 71 28 60 28C48 28 38 36 36 46Z"
          fill="url(#fem-hair-grad)"
        />
        <path
          d="M36 44C36 33 47 24 62 26C53 28 42 36 40 50C38 47 36 45 36 44Z"
          fill="url(#fem-hair-shine)"
        />

        {/* Gold Earrings */}
        <circle cx="39" cy="54" r="2.8" fill="#FFB800" />
        <circle cx="81" cy="54" r="2.8" fill="#FFB800" />
      </g>
    </svg>
  );
}
