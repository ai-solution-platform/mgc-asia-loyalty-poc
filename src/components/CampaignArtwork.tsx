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
// All photos verified for: (1) correct brand, (2) car as clear focus filling 50%+ of frame,
// (3) clean background, (4) recent model where applicable.
const brandPhotos: Record<string, string> = {
  // BMW — M5 Competition (black), close-up front shot, Atlanta dealership setting (Archivio Automobile, 2024)
  'BMW': 'https://images.unsplash.com/photo-1714434087918-4b9abedef3c6?w=800&q=80&auto=format&fit=crop',
  // Rolls-Royce — Cullinan SUV (red), parked in front of building, Jakarta (Rico Reynaldi, 2023)
  'Rolls-Royce': 'https://images.unsplash.com/photo-1699323472812-9005bdfcb206?w=800&q=80&auto=format&fit=crop',
  // MINI — Cooper (yellow & black), front-on shot on road (Devon Janse van Rensburg, 2020)
  'MINI': 'https://images.unsplash.com/photo-1580719026872-43cdd5e47329?w=800&q=80&auto=format&fit=crop',
  // Maserati — GranTurismo (black), parked on road, building background (Vlad Grebenyev, 2022)
  'Maserati': 'https://images.unsplash.com/photo-1657714601182-6bace9183b50?w=800&q=80&auto=format&fit=crop',
  // Honda — Civic sedan (red), urban setting, Brazil (Dieny Portinanni, 2019)
  'Honda': 'https://images.unsplash.com/photo-1561823528-057f4774dd3e?w=800&q=80&auto=format&fit=crop',
  // Harley-Davidson — black cruiser motorcycle, focused shot (Getúlio Moraes, 2019)
  'Harley-Davidson': 'https://images.unsplash.com/photo-1567651336571-633e3d0877d5?w=800&q=80&auto=format&fit=crop',
  // Triumph — Speed Triple R 2015, parked roadside, motorcycle as clear focus (Tigran Hambardzumyan, 2021)
  'Triumph': 'https://images.unsplash.com/photo-1635477906625-ef1aea584e17?w=800&q=80&auto=format&fit=crop',
  // Morgan — Aeromax (black), British roadster, on concrete road (Dominik Lückmann, 2020)
  'Morgan': 'https://images.unsplash.com/photo-1596888038185-ec0ed823cf5b?w=800&q=80&auto=format&fit=crop',
  'MORGAN': 'https://images.unsplash.com/photo-1596888038185-ec0ed823cf5b?w=800&q=80&auto=format&fit=crop',
  // Sixt (rental) — using BMW M5 Competition as premium-rental visual
  'Sixt': 'https://images.unsplash.com/photo-1714434087918-4b9abedef3c6?w=800&q=80&auto=format&fit=crop',
  // All Brands — Maserati GranTurismo as luxury lineup hero
  'All Brands': 'https://images.unsplash.com/photo-1657714601182-6bace9183b50?w=800&q=80&auto=format&fit=crop',
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
