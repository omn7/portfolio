import React from 'react';

interface HolographicAvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

export const HolographicAvatar: React.FC<HolographicAvatarProps> = ({ 
  src, 
  alt = "Avatar",
  className = ""
}) => {
  return (
    <div className={`relative group overflow-hidden rounded-b-lg ${className}`}>
      {/* Vignette (Screen Curve) */}
      <div className="absolute inset-0 z-30 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded-b-lg" />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px]" />

      {/* Image Container with Glitch Effect */}
      <div className="relative z-10 transition-transform duration-200 group-hover:translate-x-1 group-hover:skew-x-1">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto object-contain rounded bg-black/20 transition-all duration-200 group-hover:[filter:drop-shadow(-2px_0_rgba(255,0,0,0.7))_drop-shadow(2px_0_rgba(0,255,255,0.7))]"
        />
      </div>
    </div>
  );
};

export default HolographicAvatar;
