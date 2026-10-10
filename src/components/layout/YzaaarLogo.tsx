'use client';

import React from 'react';

interface YzaaarLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
}

export default function YzaaarLogo({
  variant = 'light',
  className = '',
  size = 'md',
  withTagline = true,
}: YzaaarLogoProps) {
  // Dimensions
  const heights = {
    sm: 38,
    md: 52,
    lg: 72,
  };

  const height = heights[size];
  const textColor = variant === 'dark' ? '#0F0F11' : variant === 'gold' ? '#E5C158' : '#FAF9F6';
  const goldColor = '#D4AF37';

  return (
    <div className={`yzaaar-brand-logo ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        height={height}
        viewBox="0 0 380 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="yzaaarGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFB758" />
            <stop offset="35%" stopColor="#FFF2C6" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9C7718" />
          </linearGradient>
          <linearGradient id="yzaaarRibbonShade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#876612" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFE8A3" />
          </linearGradient>
        </defs>

        {/* --- STYLIZED GOLDEN 'Y' RIBBON --- */}
        <g id="letter-Y">
          {/* Left stalk */}
          <path
            d="M 12 12 L 32 12 L 32 60 L 12 60 Z"
            fill={textColor}
          />
          {/* Flowing Gold Swirl Ribbon Wrapping around Y */}
          <path
            d="M 5 36 C 24 16, 50 10, 68 8 C 55 24, 38 42, 28 58 C 44 68, 56 78, 66 84 C 48 86, 26 78, 14 66 C 8 56, 4 44, 5 36 Z"
            fill="url(#yzaaarGoldGrad)"
          />
          {/* Inner Highlight Loop */}
          <path
            d="M 18 38 C 30 26, 52 18, 62 14 C 48 30, 32 50, 24 64 C 18 54, 16 45, 18 38 Z"
            fill="url(#yzaaarRibbonShade)"
            opacity="0.9"
          />
        </g>

        {/* --- LUXURY SERIF 'Z' --- */}
        <g id="letter-Z">
          <path
            d="M 80 20 L 138 20 L 138 28 L 98 74 L 142 74 L 142 84 L 78 84 L 78 76 L 118 30 L 80 30 Z"
            fill={textColor}
          />
        </g>

        {/* --- FIRST 'A' WITH TAILORED SUIT & HANGER SILHOUETTE --- */}
        <g id="letter-A1">
          {/* Outer A legs */}
          <path
            d="M 148 84 L 176 18 L 188 18 L 216 84 L 202 84 L 195 67 L 168 67 L 161 84 Z M 172 58 L 191 58 L 182 34 Z"
            fill={textColor}
          />
          {/* Suit Hanger Motif within A */}
          <path
            d="M 182 10 C 184 6, 188 6, 188 9 C 188 12, 184 14, 182 16"
            stroke="url(#yzaaarGoldGrad)"
            strokeWidth="2.2"
            fill="none"
          />
          <path
            d="M 174 20 L 182 17 L 190 20 L 187 36 L 177 36 Z"
            fill="url(#yzaaarGoldGrad)"
            opacity="0.85"
          />
        </g>

        {/* --- SECOND 'A' WITH SARTORIAL SILHOUETTE --- */}
        <g id="letter-A2">
          <path
            d="M 226 84 L 254 18 L 266 18 L 294 84 L 280 84 L 273 67 L 246 67 L 239 84 Z M 250 58 L 269 58 L 260 34 Z"
            fill={textColor}
          />
        </g>

        {/* --- LUXURY SERIF 'R' WITH FLOWING SWOOSH --- */}
        <g id="letter-R">
          <path
            d="M 306 20 L 336 20 C 352 20, 360 28, 360 38 C 360 48, 350 54, 338 56 C 348 64, 360 76, 370 84 L 354 84 C 344 76, 334 65, 326 58 L 320 58 L 320 84 L 306 84 Z M 320 30 L 320 48 L 334 48 C 342 48, 347 44, 347 39 C 347 34, 342 30, 334 30 Z"
            fill={textColor}
          />
        </g>
      </svg>

      {/* --- TAGLINE: "— FASHION | LIVES | ONLINE —" --- */}
      {withTagline && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '0.2rem',
            width: '100%',
          }}
        >
          <div
            style={{
              height: '1px',
              flex: '1',
              maxWidth: '48px',
              background: 'linear-gradient(90deg, transparent, #D4AF37)',
            }}
          />
          <span
            style={{
              fontSize: size === 'sm' ? '0.58rem' : size === 'lg' ? '0.8rem' : '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.34em',
              color: textColor,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sans)',
            }}
          >
            FASHION <span style={{ color: goldColor, opacity: 0.8 }}>|</span> LIVES <span style={{ color: goldColor, opacity: 0.8 }}>|</span> ONLINE
          </span>
          <div
            style={{
              height: '1px',
              flex: '1',
              maxWidth: '48px',
              background: 'linear-gradient(90deg, #D4AF37, transparent)',
            }}
          />
        </div>
      )}
    </div>
  );
}
