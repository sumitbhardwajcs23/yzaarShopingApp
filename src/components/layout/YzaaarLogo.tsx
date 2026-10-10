'use client';

import React from 'react';
import Image from 'next/image';

interface YzaaarLogoProps {
  variant?: 'light' | 'dark' | 'gold' | 'original';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  height?: number;
  withTagline?: boolean;
}

export default function YzaaarLogo({
  variant = 'light',
  className = '',
  size = 'md',
  height: customHeight,
}: YzaaarLogoProps) {
  // Height presets for sleek luxury scaling
  const sizeMap = {
    sm: 34,
    md: 46,
    lg: 64,
    xl: 82,
  };

  const finalHeight = customHeight || sizeMap[size] || 46;
  // Original aspect ratio 692 / 212 = 3.264
  const finalWidth = Math.round(finalHeight * 3.264);

  // Choose the optimal high-res asset
  let src = '/images/logo-light.png';
  if (variant === 'dark') {
    src = '/images/logo-dark.png';
  } else if (variant === 'original') {
    src = '/images/logo-original.png';
  }

  const isGold = variant === 'gold';

  return (
    <div
      className={`yzaaar-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        filter: isGold
          ? 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.5)) sepia(40%)'
          : 'none',
        transition: 'transform 0.25s ease, opacity 0.25s ease',
      }}
    >
      <Image
        src={src}
        alt="Yzaaar — Haute Couture & Bespoke Luxury Fashion"
        width={finalWidth}
        height={finalHeight}
        priority
        style={{
          height: `${finalHeight}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}
