import React from "react";

export default function ImageLightbox({ src, open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button onClick={onClose} className="absolute top-4 left-4 text-white text-2xl">✕</button>
      <div className="max-w-[96%] max-h-[96%]">
        <img src={src} alt="preview" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
