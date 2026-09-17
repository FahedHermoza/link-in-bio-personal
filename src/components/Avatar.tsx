import { useState } from 'react';

interface AvatarProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  name: string;
}

export function Avatar({ src, fallbackSrc, alt, name }: AvatarProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="relative inline-block mx-auto select-none group" id="profile-avatar-container">
      <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden p-1 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.02]">
        {!hasError ? (
          <img
            id="profile-avatar-img"
            src={imgSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={handleError}
            className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#6876F0] to-[#A85EE2] flex items-center justify-center text-white font-bold text-2xl">
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)}
          </div>
        )}
      </div>

      {/* Online / Active status beacon indicator */}
      <span
        id="profile-status-indicator"
        title="Disponible para proyectos y networking"
        className="absolute bottom-1 right-1 md:bottom-1.5 md:right-1.5 flex h-4 w-4 md:h-4.5 md:w-4.5 items-center justify-center"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 md:h-4 md:w-4 bg-emerald-500 ring-2 ring-white"></span>
      </span>
    </div>
  );
}
