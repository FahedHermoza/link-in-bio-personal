import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Download, Share2, Radio } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  name: string;
  onCopySuccess: () => void;
}

export function QrModal({ isOpen, onClose, url, name, onCopySuccess }: QrModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 240,
          margin: 2,
          color: {
            dark: '#2D3139',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error('QR generation error:', error);
        }
      );
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleDownloadQR = () => {
    if (!canvasRef.current) return;
    const pngUrl = canvasRef.current.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `QR_Fahed_Hermoza.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      onCopySuccess();
    } catch {
      // Fallback
    }
  };

  return (
    <div
      id="qr-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="qr-modal-dialog"
        className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl ring-1 ring-black/5 text-center transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="btn-close-qr-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2 text-[#484dc4]">
          <Radio className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
            Tarjeta NFC & Código QR
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-1">{name}</h3>
        <p className="text-xs text-slate-500 mb-5">
          Escanea con la cámara de tu smartphone para abrir al instante
        </p>

        {/* QR Canvas Container */}
        <div className="flex justify-center p-3 bg-[#F7F8FA] rounded-xl border border-slate-200/80 mb-5 mx-auto w-fit shadow-inner">
          <canvas ref={canvasRef} className="rounded-lg max-w-[200px] h-auto" />
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id="btn-copy-url"
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            Copiar Enlace
          </button>
          <button
            id="btn-download-qr"
            onClick={handleDownloadQR}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#484dc4] hover:bg-[#3d42b0] text-white text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Guardar PNG
          </button>
        </div>
      </div>
    </div>
  );
}
