/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Contact, Radio, ExternalLink } from 'lucide-react';
import { PROFILE_DATA, downloadVCard } from './data';
import { Avatar } from './components/Avatar';
import { SocialButton } from './components/SocialButton';
import { QuickActions } from './components/QuickActions';
import { QrModal } from './components/QrModal';
import { Toast } from './components/Toast';

export default function App() {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  const handleSaveContact = () => {
    downloadVCard(PROFILE_DATA);
    triggerToast('¡Contacto vCard descargado! Listo para guardar en tu agenda.');
  };

  const handleShare = async () => {
    const shareData = {
      title: `${PROFILE_DATA.name} | Tarjeta Digital NFC & QR`,
      text: `Conéctate con ${PROFILE_DATA.name} (${PROFILE_DATA.title})`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User dismissed share dialog
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        triggerToast('Enlace de la tarjeta copiado al portapapeles');
      } catch {
        setIsQrOpen(true);
      }
    }
  };

  return (
    <main
      id="main-container"
      className="min-h-screen w-full bg-[#F7F8FA] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-x-hidden selection:bg-[#6876F0] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Soft ethereal ambient lighting behind the card for desktop luxury */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-[#6876f0]/10 via-[#9362e6]/10 to-[#a85ee2]/10 blur-3xl pointer-events-none rounded-full" />

      {/* Main NFC Bio Card */}
      <motion.div
        id="nfc-card"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[410px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_18px_45px_-10px_rgba(25,30,48,0.08),0_8px_16px_-6px_rgba(25,30,48,0.03)] border border-black/[0.04] transition-all"
      >
        {/* Subtle NFC signal badge in header */}
        <div className="flex items-center justify-between w-full mb-3 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5 text-[#585CE5] font-medium tracking-wide">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">NFC Connect</span>
          </div>
          <button
            id="btn-header-share"
            onClick={handleShare}
            title="Compartir tarjeta"
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Profile Avatar & Identity */}
        <div className="text-center pt-1 pb-4" id="profile-section">
          <Avatar
            src={PROFILE_DATA.avatarUrl}
            fallbackSrc="https://github.com/fahedhermoza.png"
            alt={PROFILE_DATA.name}
            name={PROFILE_DATA.name}
          />

          <h1
            id="profile-name"
            className="mt-4 text-[24px] sm:text-[26px] font-bold text-[#181C21] tracking-tight leading-tight"
          >
            {PROFILE_DATA.name}
          </h1>

          <p id="profile-handle" className="text-[13.5px] font-medium text-[#717886] mt-0.5">
            {PROFILE_DATA.handle}
          </p>

          <p
            id="profile-title"
            className="text-[10.5px] sm:text-[11px] font-bold text-[#8B92A2] tracking-[0.1em] uppercase mt-2 select-none"
          >
            {PROFILE_DATA.title}
          </p>

          {/* Quick Direct Communication Bar */}
          <QuickActions
            phone={PROFILE_DATA.phoneRaw}
            email={PROFILE_DATA.email}
            onOpenQr={() => setIsQrOpen(true)}
            onShare={handleShare}
          />
        </div>

        {/* Action Buttons Stack (Socials & Portfolio) */}
        <div className="space-y-3 my-2" id="social-buttons-stack">
          {PROFILE_DATA.links.map((link, index) => (
            <SocialButton key={link.id} link={link} index={index} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-[#EBEFF2]" />

        {/* Bottom CTA & Direct Email Note */}
        <div className="text-center space-y-4" id="card-footer-section">
          <p className="text-[12.5px] sm:text-[13px] text-[#717886] leading-relaxed max-w-[320px] mx-auto">
            ¿Tienes un proyecto en mente? Haz clic en mis redes o{' '}
            <a
              id="link-direct-email"
              href={`mailto:${PROFILE_DATA.email}`}
              className="text-[#585CE5] font-semibold underline underline-offset-2 hover:text-[#484dc4] transition-colors"
            >
              escríbeme directamente
            </a>
            .
          </p>

          {/* Save Contact vCard Button */}
          <div>
            <button
              id="btn-save-contact"
              onClick={handleSaveContact}
              className="group inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-800 text-[12.5px] font-semibold tracking-wide shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 transition-all duration-200 active:scale-95"
            >
              <Contact className="w-4 h-4 text-[#585CE5] transition-transform group-hover:scale-110" />
              <span>Guardar Contacto</span>
            </button>
          </div>

          {/* NFC & QR Physical Card indicator label */}
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#A2A8B4] font-medium">
            <span className="inline-block text-[#585CE5] font-bold">•))</span>
            <span>Tarjeta NFC & QR • Fahed Hermoza</span>
          </div>
        </div>
      </motion.div>

      {/* Floating QR Modal */}
      <QrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        url={window.location.href}
        name={PROFILE_DATA.name}
        onCopySuccess={() => triggerToast('Enlace copiado al portapapeles')}
      />

      {/* Interactive Toast */}
      <Toast message={toastMessage} isVisible={showToast} />
    </main>
  );
}
