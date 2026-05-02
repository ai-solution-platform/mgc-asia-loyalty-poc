import { useState } from 'react';

type BrandKey = 'BMW' | 'Rolls-Royce' | 'MINI' | 'Honda' | 'Triumph' | 'MORGAN' | 'Morgan' | 'Harley-Davidson' | 'Maserati' | 'Sixt' | 'All Brands' | string;

interface CampaignArtworkProps {
  brand: BrandKey;
  campaignType: string;
  title: string;
  className?: string;
}

// Subtle brand-color gradients used as fallback / blending overlay
const brandGradients: Record<string, [string, string]> = {
  'BMW': ['#1B4D8C', '#2563eb'],
  'Rolls-Royce': ['#0a0a0a', '#1a1a2e'],
  'MINI': ['#8B4513', '#C9A96E'],
  'Honda': ['#c1121f', '#8b0000'],
  'Triumph': ['#dc2626', '#1f2937'],
  'MORGAN': ['#16a34a', '#d4a853'],
  'Morgan': ['#16a34a', '#d4a853'],
  'Harley-Davidson': ['#ff6b35', '#1a1a1a'],
  'Maserati': ['#1a1a2e', '#4a5568'],
  'Sixt': ['#FF5F00', '#CC4C00'],
  'All Brands': ['#1B2B5B', '#C9A96E'],
};

// Real car/motorcycle photos from Unsplash (free for commercial use, no attribution required).
// Format: https://images.unsplash.com/photo-{ID}?w=800&q=80&auto=format&fit=crop
const brandPhotos: Record<string, string> = {
  // BMW — modern silver sedan profile shot
  'BMW': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop',
  // Rolls-Royce — luxury black sedan / Phantom-like
  'Rolls-Royce': 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80&auto=format&fit=crop',
  // MINI — Cooper S 3-door hatchback (verified gray Mini Cooper, Brecht Denil)
  'MINI': 'https://images.unsplash.com/photo-1564390162138-f6f1ffe41d92?w=800&q=80&auto=format&fit=crop',
  // Maserati / sport coupe
  'Maserati': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80&auto=format&fit=crop',
  // Honda — Civic Si red sedan (verified Honda showroom, Dieny Portinanni)
  'Honda': 'https://images.unsplash.com/photo-1561823528-057f4774dd3e?w=800&q=80&auto=format&fit=crop',
  // Harley-Davidson — cruiser motorcycle
  'Harley-Davidson': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80&auto=format&fit=crop',
  // Triumph — sport motorcycle (using a sport-bike photo as thematic match)
  'Triumph': 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80&auto=format&fit=crop',
  // Morgan — vintage roadster (using a classic-car photo as thematic match)
  'Morgan': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop',
  'MORGAN': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop',
  // Sixt (rental) — generic premium car
  'Sixt': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop',
  // All Brands — luxury car lineup feel
  'All Brands': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80&auto=format&fit=crop',
};

function getBrandPhoto(brand: string): string {
  return brandPhotos[brand] || brandPhotos['All Brands'];
}

export function CampaignArtwork({ brand, campaignType: _campaignType, title, className = '' }: CampaignArtworkProps) {
  const [color1, color2] = brandGradients[brand] || brandGradients['All Brands'];
  const photoUrl = getBrandPhoto(brand);
  const [imgError, setImgError] = useState(false);

  const truncatedTitle = title.length > 38 ? title.slice(0, 38) + '...' : title;

  return (
    <div
      className={`relative w-full overflow-hidden group ${className}`}
      style={{ aspectRatio: '16/9' }}
    >
      {/* Brand-color gradient base (also acts as fallback if image fails) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        }}
      />

      {/* Real car photo */}
      {!imgError && (
        <img
          src={photoUrl}
          alt={`${brand} ${title}`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ mixBlendMode: 'normal' }}
        />
      )}

      {/* Brand-color tint overlay for cohesive feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color1}55 0%, ${color2}33 100%)`,
        }}
      />

      {/* Bottom darkening gradient for text legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Top subtle gradient so the brand label stays readable */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Brand label — top-left */}
      <div className="absolute top-3 left-4 z-10">
        <span
          className="text-white/85 font-bold tracking-[0.2em]"
          style={{ fontSize: '11px', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
        >
          {brand.toUpperCase()}
        </span>
      </div>

      {/* Title — bottom */}
      <div className="absolute bottom-3 left-4 right-4 z-10">
        <h3
          className="text-white font-semibold leading-tight"
          style={{ fontSize: '13px', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
        >
          {truncatedTitle}
        </h3>
      </div>
    </div>
  );
}

export default CampaignArtwork;
