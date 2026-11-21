import React from 'react';
import { SocialLink } from '../types';
import { ExternalLink } from 'lucide-react';

interface SocialButtonProps {
  link: SocialLink;
  index: number;
  key?: React.Key;
}

// Crisp, brand-accurate SVG icons for high fidelity
function renderIcon(iconName: SocialLink['iconName']) {
  switch (iconName) {
    case 'instagram':
      return (
        <svg
          className="w-5 h-5 text-white stroke-[1.8]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.122.553 4.188 1.603 6.012L0 24l6.147-1.613c1.769.965 3.766 1.474 5.884 1.474 6.637 0 12.031-5.394 12.031-12.031S18.668 0 12.031 0zm0 22.023c-1.805 0-3.573-.487-5.113-1.408l-.367-.218-3.797.996 1.013-3.701-.239-.381a9.988 9.988 0 0 1-1.533-5.28c0-5.525 4.498-10.023 10.036-10.023 5.538 0 10.023 4.498 10.023 10.023 0 5.526-4.485 10.023-10.023 10.023zm5.503-7.518c-.302-.151-1.787-.882-2.064-.983-.277-.101-.478-.151-.68.151-.202.302-.782.983-.958 1.184-.176.202-.353.227-.655.076-.302-.151-1.275-.47-2.428-1.498-.897-.799-1.503-1.787-1.68-2.089-.176-.302-.019-.465.132-.616.136-.135.302-.353.453-.529.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.529-.076-.151-.68-1.638-.932-2.243-.245-.59-.494-.51-.68-.519l-.579-.01c-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.522s1.084 2.925 1.235 3.127c.151.202 2.133 3.257 5.168 4.569.722.312 1.286.499 1.726.638.725.23 1.385.197 1.906.12.58-.087 1.787-.731 2.039-1.436.252-.705.252-1.309.176-1.436-.076-.126-.277-.202-.579-.353z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case 'portfolio':
    default:
      return <ExternalLink className="w-5 h-5 text-white stroke-[2.2]" />;
  }
}

export function SocialButton({ link, index }: SocialButtonProps) {
  return (
    <a
      id={`social-link-${link.id}`}
      href={link.url}
      target={link.isExternal ? '_blank' : undefined}
      rel={link.isExternal ? 'noopener noreferrer' : undefined}
      style={{ backgroundColor: link.bgColor }}
      className="group relative flex items-center justify-between w-full h-[56px] px-5 rounded-2xl text-white font-extrabold text-[11.5px] sm:text-[12px] tracking-[0.14em] transition-all duration-200 shadow-[0_5px_12px_rgba(108,114,234,0.14)] hover:shadow-[0_10px_22px_rgba(108,114,234,0.24)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#585CE5] overflow-hidden"
    >
      {/* Subtle shine hover effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/15 via-transparent to-black/10 pointer-events-none" />

      {/* Button label on the left */}
      <span className="relative z-10 font-extrabold uppercase select-none drop-shadow-sm">
        {link.label}
      </span>

      {/* Brand icon on the right */}
      <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-110">
        {renderIcon(link.iconName)}
      </span>
    </a>
  );
}
