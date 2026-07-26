import React from 'react';

function CartSummary({ summaryData }) {
  const {
    totalOriginal = '۲۷۷,۵۰۰',
    totalDiscount = '۲۷۷,۵۰۰',
    totalPayable = '۱۲,۵۰۰,۰۰۰',
  } = summaryData || {};

  return (
    <div className="sticky bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 p-4 rounded-t-3xl shadow-[0_-4px_25px_rgba(0,0,0,0.06)] space-y-2.5 z-10">
      {/* Row 1: Total Orders */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-kal-2">
        <span>جمع کل سفارشات:</span>
        <span className="font-kal-3 text-gray-700 font-medium">{totalOriginal} تومان</span>
      </div>

      {/* Row 2: Total Discount */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-kal-2">
        <span>مجموع کل تخفیف:</span>
        <span className="font-kal-3 text-[#ff0055] font-medium">{totalDiscount} تومان</span>
      </div>

      {/* Dashed Divider */}
      <div className="border-b border-dashed border-gray-200 my-1.5" />

      {/* Row 3: Payable Amount */}
      <div className="flex items-center justify-between text-sm font-kal-3 font-bold text-gray-900 pt-0.5">
        <span>مبلغ قابل پرداخت:</span>
        <span className="text-base text-gray-900">{totalPayable} <span className="text-xs font-normal text-gray-500">تومان</span></span>
      </div>

      {/* Payment Action Button */}
      <button className="w-full bg-[#ff0055] hover:bg-[#e0004c] active:scale-[0.99] text-white font-kal-3 font-bold text-sm py-3 rounded-2xl shadow-md shadow-pink-500/20 text-center transition-all cursor-pointer mt-2">
        پرداخت
      </button>
    </div>
  );
}

export default CartSummary;
