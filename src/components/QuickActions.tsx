import React from 'react';
import { Phone, Mail, QrCode, Share2 } from 'lucide-react';

interface QuickActionsProps {
  phone: string;
  email: string;
  onOpenQr: () => void;
  onShare: () => void;
}

export function QuickActions({ phone, email, onOpenQr, onShare }: QuickActionsProps) {
  return (
    <div id="quick-action-bar" className="flex items-center justify-center gap-3 my-4">
      {/* Call directly */}
      <a
        id="quick-action-phone"
        href={`tel:${phone}`}
        title="Llamar directamente"
        aria-label="Llamar directamente"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F0F2F6] hover:bg-white text-slate-600 hover:text-[#484dc4] hover:shadow-md transition-all duration-200 active:scale-95 border border-slate-200/50"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Email */}
      <a
        id="quick-action-email"
        href={`mailto:${email}`}
        title="Enviar correo"
        aria-label="Enviar correo"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F0F2F6] hover:bg-white text-slate-600 hover:text-[#484dc4] hover:shadow-md transition-all duration-200 active:scale-95 border border-slate-200/50"
      >
        <Mail className="w-4 h-4" />
      </a>

      {/* QR Code */}
      <button
        id="quick-action-qr"
        onClick={onOpenQr}
        title="Ver código QR de la tarjeta"
        aria-label="Ver código QR de la tarjeta"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F0F2F6] hover:bg-white text-slate-600 hover:text-[#484dc4] hover:shadow-md transition-all duration-200 active:scale-95 border border-slate-200/50"
      >
        <QrCode className="w-4 h-4" />
      </button>

      {/* Share */}
      <button
        id="quick-action-share"
        onClick={onShare}
        title="Compartir tarjeta"
        aria-label="Compartir tarjeta"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F0F2F6] hover:bg-white text-slate-600 hover:text-[#484dc4] hover:shadow-md transition-all duration-200 active:scale-95 border border-slate-200/50"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
}
