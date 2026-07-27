import React, { useState } from 'react';
import { ChevronRight, Maximize2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeaderImageSlider({ image, images }) {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Determine single main product image
  const singleImage = image || (Array.isArray(images) && images.length > 0 ? images[0] : '/placeholder.jpg');

  return (
    <>
      <div
        onClick={() => setIsFullscreen(true)}
        className="relative w-full h-80 overflow-hidden rounded-b-[40px] shadow-md group cursor-zoom-in bg-slate-100"
      >
        <img
          src={singleImage}
          alt="عکس محصول"
          className="w-full h-full object-cover brightness-95 transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Visual gradient overlay for top and bottom readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* Floating Zoom Icon */}
        <div className="absolute bottom-5 left-5 z-20 flex items-center justify-center bg-black/40 p-2 rounded-full text-white hover:bg-black/60 transition-all pointer-events-none">
          <Maximize2 className="w-4 h-4" />
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(-1);
          }}
          className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-black/60 active:scale-95 text-white rounded-full transition-all backdrop-blur-md cursor-pointer border border-white/10"
          title="بازگشت"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 animate-fade-in"
          dir="rtl"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Bar inside Fullscreen */}
          <div className="flex justify-between items-center w-full max-w-lg mx-auto pt-6 z-30">
            <span className="text-white text-sm font-black tracking-wide">
              تصویر محصول
            </span>
            <button
              id="close-gallery-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all cursor-pointer backdrop-blur-md"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Large Img */}
          <div className="flex-1 flex items-center justify-center relative w-full max-w-2xl mx-auto">
            <img
              src={singleImage}
              alt="عکس بزرگ محصول"
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="w-full text-center pb-8 z-30">
            <p className="text-white/50 text-[11px] font-bold">برای خروج، روی دکمه ضربدر یا خارج از تصویر کلیک کنید.</p>
          </div>
        </div>
      )}
    </>
  );
}

