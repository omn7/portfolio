import { useEffect, useRef, useState } from 'react';
import MarioCharacter from './MarioCharacter';

// Renders stickers/mario.webm video if present; falls back to root mario.webm then SVG MarioCharacter.
const MarioVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const timeout = setTimeout(() => {
      // If metadata not loaded quickly, fallback.
      if (v.readyState < 2) {
        setUseFallback(true);
      }
    }, 2000);
    const handleError = () => setUseFallback(true);
    v.addEventListener('error', handleError);
    v.addEventListener('abort', handleError);
    return () => {
      clearTimeout(timeout);
      v.removeEventListener('error', handleError);
      v.removeEventListener('abort', handleError);
    };
  }, []);

  if (useFallback) {
    return <MarioCharacter />;
  }

  // Attempt stickers path first; browser will 404 -> onerror triggers fallback.
  return (
    <video
      ref={videoRef}
      src="/stickers/mario.webm"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-contain select-none pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
      onError={(e) => {
        // try root as secondary source before full fallback
        const v = e.currentTarget;
        if (v.getAttribute('data-tried-root')) return; // avoid loop
        v.setAttribute('data-tried-root', 'true');
        v.src = '/mario.webm';
        v.load();
      }}
    />
  );
};

export default MarioVideo;
