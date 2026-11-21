/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Contact, Radio, ExternalLink } from 'lucide-react';
import { PROFILE_DATA, downloadVCard } from './data';
import { SocialButton } from './components/SocialButton';
import { ProfileOverview } from './components/ProfileOverview';
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
      className="min-h-screen w-full bg-[radial-gradient(circle_at_15%_15%,#e9e8ff_0%,transparent_35%),radial-gradient(circle_at_85%_80%,#f7dff5_0%,transparent_35%),#f5f6fb] flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-x-hidden selection:bg-[#6876F0] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Soft ethereal ambient lighting behind the card for desktop luxury */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-gradient-to-tr from-[#6876f0]/15 via-[#9362e6]/10 to-[#a85ee2]/10 blur-3xl pointer-events-none rounded-full" />

      {/* Main NFC Bio Card */}
      <motion.div
        id="nfc-card"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[430px] bg-white rounded-[30px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_28px_80px_-24px_rgba(67,54,130,0.25),0_8px_24px_-12px_rgba(25,30,48,0.1)] border border-white/80 overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#6876F0] via-[#9362E6] to-[#E489C4]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-1.5 h-44 bg-gradient-to-b from-[#f5f3ff] via-[#faf9ff] to-white pointer-events-none" />
        {/* Subtle NFC signal badge in header */}
        <div className="relative flex items-center justify-between w-full mb-3 pt-1 text-slate-400 text-xs">
          <div className="flex items-center gap-2 text-[#585CE5] font-medium tracking-wide">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ecebff]"><Radio className="w-4 h-4" /></span>
            <span className="text-[11px] font-semibold uppercase tracking-wider">NFC Connect</span>
          </div>
          <button
            id="btn-header-share"
            onClick={handleShare}
            title="Compartir tarjeta"
            aria-label="Compartir tarjeta"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7e5f4] bg-white/80 text-[#585CE5] hover:bg-[#eeedff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#585CE5] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Avatar & Identity */}
        <ProfileOverview
          profile={PROFILE_DATA}
          onOpenQr={() => setIsQrOpen(true)}
          onShare={handleShare}
        />

        {/* Action Buttons Stack (Socials & Portfolio) */}
        <div className="relative space-y-3 my-3" id="social-buttons-stack">
          {PROFILE_DATA.links.map((link, index) => (
            <SocialButton key={link.id} link={link} index={index} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-[#eeedf5]" />

        {/* Bottom CTA & Direct Email Note */}
        <div className="text-center space-y-4 rounded-2xl bg-[#f8f7fd] px-4 py-5 sm:px-5" id="card-footer-section">
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
              className="group inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#e5e2f6] bg-white hover:bg-[#efedff] text-[#34335c] text-[12.5px] font-semibold tracking-wide shadow-[0_3px_10px_rgba(87,79,148,0.08)] hover:shadow-md transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#585CE5]"
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
