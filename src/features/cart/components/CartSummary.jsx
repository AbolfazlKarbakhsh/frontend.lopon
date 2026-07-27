import React from 'react';

function CartSummary({ summaryData, onCheckout }) {
  const {
    totalOriginal = '۲۷۷,۵۰۰',
    totalDiscount = '۲۷۷,۵۰۰',
    totalPayable = '۱۲,۵۰۰,۰۰۰',
  } = summaryData || {};

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Receipt Style Box */}
      <div className="relative bg-[#f4f5f8] rounded-2xl p-3.5 sm:p-5 border border-slate-100 shadow-2xs overflow-hidden">
        {/* Left Side Notch Cutout */}
        <div className="absolute -left-3 top-[calc(50%+2px)] -translate-y-1/2 w-5 h-5 rounded-full bg-white border-r border-slate-200/80" />

        {/* Right Side Notch Cutout */}
        <div className="absolute -right-3 top-[calc(50%+2px)] -translate-y-1/2 w-5 h-5 rounded-full bg-white border-l border-slate-200/80" />

        {/* Row 1: Total Orders */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-kal-2">
          <span>جمع کل سفارشات:</span>
          <span className="font-kal-3 text-slate-700 font-bold">
            {totalOriginal} <span className="text-[10px] sm:text-[11px] font-normal text-slate-400 font-kal-2">تومان</span>
          </span>
        </div>

        {/* Row 2: Total Discount */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-kal-2 mt-2 sm:mt-3">
          <span>مجموع کل تخفیف:</span>
          <span className="font-kal-3 text-slate-700 font-bold">
            {totalDiscount} <span className="text-[10px] sm:text-[11px] font-normal text-slate-400 font-kal-2">تومان</span>
          </span>
        </div>

        {/* Dashed Separator Line */}
        <div className="border-b border-dashed border-slate-300 my-2.5 sm:my-3.5 w-full" />

        {/* Row 3: Payable Amount */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-kal-3 font-bold text-slate-700">
          <span className="text-slate-700 font-bold">مبلغ قابل پرداخت:</span>
          <span className="text-sm sm:text-base text-slate-900 font-extrabold">
            {totalPayable} <span className="text-[10px] sm:text-[11px] font-normal text-slate-500 font-kal-2">تومان</span>
          </span>
        </div>
      </div>

      {/* Payment Action Button */}
      <button
        onClick={onCheckout}
        className="w-full bg-[#ff0055] hover:bg-[#e0004c] active:scale-[0.99] text-white font-kal-3 font-bold text-sm sm:text-base py-3 sm:py-3.5 rounded-2xl shadow-md shadow-pink-500/15 text-center transition-all cursor-pointer"
      >
        پرداخت
      </button>
    </div>
  );
}

export default CartSummary;
