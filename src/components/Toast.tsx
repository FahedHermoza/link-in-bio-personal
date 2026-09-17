import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div
      id="feedback-toast"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 text-white rounded-full text-xs font-medium shadow-xl backdrop-blur-xs transition-all animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white">
        <Check className="w-3 h-3 stroke-[3]" />
      </span>
      <span>{message}</span>
    </div>
  );
}
