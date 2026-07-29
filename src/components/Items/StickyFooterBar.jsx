import React from 'react';

export default function StickyFooterBar({
  totalOriginal = 13500000,
  totalDiscounted = 12500000,
  totalQuantity = 0,
  onCheckout,
}) {
  const displayDiscounted = totalQuantity > 0 ? totalDiscounted : 12500000;
  const displayOriginal = totalQuantity > 0 ? totalOriginal : 13500000;

  return (
    <div className="fixed bottom-[58px] left-0 right-0 z-40 w-full max-w-md md:max-w-xl mx-auto bg-white border-t border-slate-100 px-4 py-2.5 flex items-center justify-between font-kal-2 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] gap-5">
      {/* Right side in RTL: Complete Purchase Button (50% width) */}
      <button
        id="checkout-trigger-btn"
        type="button"
        onClick={onCheckout}
        className="w-1/2 bg-[#ff0055] hover:bg-[#e0004c] active:scale-[0.99] text-white font-kal-3 font-bold text-sm sm:text-base py-3 rounded-[8px] shadow-md shadow-pink-500/15 text-center transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        <span>تکمیل خرید</span>
        {totalQuantity > 0 && (
          <span className="bg-white text-[#ff0055] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* Left side in RTL: Price container (50% width) - aligned to left (justify-end in RTL) */}
      <div className="w-1/2 flex items-center justify-end gap-1.5 overflow-hidden">
        {/* Original Price with diagonal strike-through */}
        {displayOriginal > displayDiscounted && (
          <span className="relative inline-block text-xs text-slate-300 font-normal shrink-0">
            {displayOriginal.toLocaleString('fa-IR')}
            <span className="absolute inset-0 top-1/2 -translate-y-1/2 border-b border-slate-300 transform -rotate-[14deg] origin-center pointer-events-none" />
          </span>
        )}

        {/* Discounted Price */}
        <span className="text-base sm:text-lg font-normal text-slate-800 shrink-0">
          {displayDiscounted.toLocaleString('fa-IR')}
        </span>

        {/* Custom Toman Word on the far left */}
        <div className="flex flex-col items-center justify-center leading-none text-slate-400 font-kal-2 select-none shrink-0 ms-0.5">
          <span className="text-[8px] font-normal leading-none mb-[1px]">ن</span>
          <span className="text-[9px] font-normal leading-none">تـوما</span>
        </div>
      </div>
    </div>
  );
}


