import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeaderImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-scroll loop only active when not in fullscreen mode
  useEffect(() => {
    if (isFullscreen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length, isFullscreen]);

  return (
    <>
      <div
        onClick={() => setIsFullscreen(true)}
        className="relative w-full h-80 overflow-hidden rounded-b-[40px] shadow-md group cursor-zoom-in"
      >
        {/* Absolute Stacking Fading Slider */}
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            <img
              src={src}
              alt={`مجموعه زیبایی زیبا بیوتی کرمان اسلاید ${index + 1}`}
              className="w-full h-full object-cover brightness-90 animate-fade-in"
              referrerPolicy="no-referrer"
            />
            {/* Visual gradient overlay for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/40 to-transparent" />
          </div>
        ))}

        {/* Floating Indicator zoom icon */}
        <div className="absolute bottom-5 left-5 z-20 flex items-center justify-center bg-black/40 p-2 rounded-full text-white hover:bg-black/60 transition-all pointer-events-none">
          <Maximize2 className="w-4 h-4" />
        </div>

        {/* Elegant Circular Back Button (RTL-oriented) */}

        <Link to={"/"}>
          <button
            className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-black/50 active:scale-95 text-white rounded-full transition-all backdrop-blur-md cursor-pointer border border-white/10"
            title="بازگشت"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </Link>

        {/* Manual Swiping Triggers (Left-Right) */}
        <button
          id="prev-slide-control"
          onClick={handleNext}

          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          id="next-slide-control"
          onClick={handlePrev}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Premium slider pagination indicators matching design: ○ ○ ● ○ ○ */}
        <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${currentIndex === index
                  ? 'w-3 h-3 bg-white border border-white shadow-xs'
                  : 'w-2.5 h-2.5 bg-transparent border-2 border-white/80 hover:border-white shadow-xs'
                }`}
              title={`اسلاید ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* FULLSCREEN GALLERY SLIDER MODAL */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 animate-fade-in"
          dir="rtl"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Bar inside Fullscreen */}
          <div className="flex justify-between items-center w-full max-w-lg mx-auto pt-6 z-30">
            <span className="text-white text-sm font-black tracking-wide">
              تصاویر سالن زیبایی (اسلاید {(currentIndex + 1).toLocaleString('fa-IR')} از {images.length.toLocaleString('fa-IR')})
            </span>
            <button
              id="close-gallery-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="flex items-center justify-center w-11 h-11 bg-white/10 hover:bg-white/25 text-white rounded-full transition-all cursor-pointer backdrop-blur-md"
              title="بستن گالری"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Large Img */}
          <div className="flex-1 flex items-center justify-center relative w-full max-w-2xl mx-auto">
            <img
              src={images[currentIndex]}
              alt="نمای بزرگ سالن"
              className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()} // don't close when touching the image
            />

            {/* Manual Controls in Fullscreen */}
            <button
              id="fullscreen-prev-btn"
              onClick={handleNext}

              className="absolute left-2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-90 text-white rounded-full transition-all cursor-pointer backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              id="fullscreen-next-btn"
              onClick={handlePrev}
              className="absolute right-2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-90 text-white rounded-full transition-all cursor-pointer backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bullet Indicators */}
          <div className="w-full text-center pb-8 z-30 flex flex-col items-center gap-4">
            <div className="flex gap-2.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`transition-all duration-350 rounded-full cursor-pointer h-3 ${currentIndex === index
                      ? 'w-7 bg-rose-500'
                      : 'w-3 bg-white/40 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>

            <p className="text-white/40 text-[11px] font-bold">برای خروج، هر کجای صفحه خارج از تصویر ضربه بزنید یا روی دکمه ضربدر کلیک کنید.</p>
          </div>
        </div>
      )}
    </>
  );
}
