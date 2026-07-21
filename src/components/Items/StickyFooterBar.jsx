import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function StickyFooterBar({
  totalOriginal,
  totalDiscounted,
  totalQuantity,
  onCheckout,
}) {
  const isCartEmpty = totalQuantity === 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full z-40 bg-white border-t border-slate-100 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex items-center justify-between gap-4">
      {/* Left side: Total dynamic pricing */}
      <div className="flex flex-col text-right justify-center">
        <span className="text-[10px] text-gray-400 font-extrabold mb-1">قیمت کل:</span>
        <div className="flex flex-col text-right">
          {totalOriginal > totalDiscounted && (
            <span className="text-[10px] text-slate-400 line-through leading-none font-medium mb-1">
              {totalOriginal.toLocaleString('fa-IR')}
            </span>
          )}
          <span className="text-base font-black text-slate-800 leading-none">
            {totalDiscounted.toLocaleString('fa-IR')}{' '}
            <span className="text-[10px] font-bold text-slate-500">ریال</span>
          </span>
        </div>
      </div>

      {/* Right side: Complete Purchase Button (تکمیل خرید) */}
      <button
        id="checkout-trigger-btn"
        disabled={isCartEmpty}
        onClick={onCheckout}
        className={`px-8 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
          isCartEmpty
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            : 'bg-[#ff1461] hover:bg-[#e00c50] active:scale-97 text-white shadow-lg shadow-rose-100 cursor-pointer'
        }`}
      >
        <ShoppingBag className="w-4 h-4" />
        <span>تکمیل خرید</span>
        {totalQuantity > 0 && (
          <span className="bg-white text-[#ff1461] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </button>
    </div>
  );
}
