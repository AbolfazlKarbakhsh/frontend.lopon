import React from 'react';
import heroBeautyImg from '@assets/images/hero_beauty_salon_1785312767446.jpg';

export function HeroSection({ onSupportClick }) {
  return (
    <div className="relative w-full pt-[95px] md:pt-[125px] pb-4 bg-gradient-to-b from-rose-50/30 via-white to-white text-center flex flex-col items-center overflow-hidden">
      {/* Top Typography & Texts */}
      <div className="px-5 max-w-lg mx-auto flex flex-col items-center">
        {/* Main Title with decorative accents */}
        <div className="relative inline-block mb-1.5">
          {/* Top Left Sparkle accent */}
          <svg className="absolute -top-3.5 -left-4 w-5 h-5 text-[#ff0055]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="2" y1="12" x2="6" y2="12" />
          </svg>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-kal-4 leading-snug">
            بهترین خدمات <span className="text-[#ff0055]">زیبایی ، یکجا</span>
          </h1>

          {/* Underline */}
          <div className="w-28 sm:w-36 h-1 mx-auto mt-1.5 rounded-full bg-[#ff0055] opacity-80" />
        </div>

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-sm text-slate-500 font-kal-2 leading-relaxed max-w-xs sm:max-w-sm mt-1">
          سالن‌های معتبر شهر را مقایسه کنید،
          <br />
          نظرات را بخوانید و با تخفیف‌های ویژه خرید کنید.
        </p>
      </div>

      {/* Hero Image & Badge Section */}
      <div className="relative w-full mt-4 px-4 sm:px-6 max-w-md mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-100">
          <img
            src={heroBeautyImg}
            alt="بهترین خدمات زیبایی"
            className="w-full h-[260px] sm:h-[320px] object-cover object-top"
            referrerPolicy="no-referrer"
          />

          {/* Floating Pink Badge on Bottom-Right */}
          <div className="absolute bottom-4 right-4 bg-[#ff0055] text-white px-4 py-2 rounded-2xl shadow-lg flex flex-col items-center justify-center font-kal-3 leading-tight text-center z-10">
            <span className="text-xs sm:text-sm font-bold">تخفیف‌های ویژه</span>
            <span className="text-[11px] sm:text-xs font-normal">هر روز</span>
          </div>
        </div>

        {/* Floating Support Button on Bottom-Left */}
        <button
          onClick={onSupportClick}
          className="absolute -bottom-4 left-6 z-20 w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
          aria-label="گفتگو با پشتیبانی"
        >
          <img
            src="/images/suport.png"
            alt="پشتیبانی"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
