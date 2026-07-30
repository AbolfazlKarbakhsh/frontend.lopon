import React, { useState } from 'react';
import { motion } from 'motion/react';

function CartSummary({ summaryData, onCheckout }) {
  const {
    totalOriginal = '۲۷۷.۵۰۰',
    totalDiscount = '۲۷۷.۵۰۰',
    totalPayable = '۱۲,۵۰۰,۰۰۰',
  } = summaryData || {};

  const [showDiscount, setShowDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = (e) => {
    e.preventDefault();
    if (discountCode.trim()) {
      alert(`کد تخفیف "${discountCode}" اعمال شد.`);
    }
  };

  return (
    <div className="w-full space-y-3 font-kal-2">
      {/* Discount Code Row */}
      <div className="pt-1 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-normal text-slate-700">کد تخفیف دارید؟</span>
          
          {/* Toggle Switch */}
          <button
            type="button"
            dir="ltr"
            onClick={() => setShowDiscount(!showDiscount)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
              showDiscount ? 'bg-[#334155]' : 'bg-slate-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out transform ${
                showDiscount ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Discount Code Input Box (Visible when toggle is ON) */}
        {showDiscount && (
          <form onSubmit={handleApplyDiscount} className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="کد تخفیف خود را وارد کنید"
              className="flex-1 bg-white border border-slate-400 rounded-[8px] px-3.5 py-2.5 text-[13px] font-normal text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-slate-600 transition-colors text-right"
            />
            <button
              type="submit"
              className="bg-[#f0f3f7] hover:bg-slate-200 text-slate-500 font-kal-3 font-normal px-5 py-2.5 rounded-[8px] text-[13px] transition-colors cursor-pointer shrink-0"
            >
              اعمال
            </button>
          </form>
        )}
      </div>

      {/* Row 1: Total Orders */}
      <div className="flex items-center justify-between py-1">
        <span className="text-slate-600 font-normal text-[13px]">جمع کل سفارشات:</span>
        <div className="flex items-center gap-1">
          <span className="font-normal text-slate-800 text-[13px]">{totalOriginal}</span>
          <span className="text-[13px] text-slate-400 font-normal">تومان</span>
        </div>
      </div>

      {/* Row 2: Savings Pill (Green Box with 8px border radius) */}
      <div className="bg-[#e8f8ee] rounded-[8px] px-3.5 py-2.5 flex items-center justify-between text-[#1e8e4a] my-1.5">
        <span className="font-normal text-[13px]">سود شما از خرید:</span>
        <div className="flex items-center gap-1">
          <span className="font-normal text-[#1e8e4a] text-[13px]">{totalDiscount}</span>
          <span className="text-[13px] text-[#1e8e4a]/70 font-normal">تومان</span>
        </div>
      </div>

      {/* Dashed Line Divider with wide dashes */}
      <div
        className="my-3 h-[1px] w-full"
        style={{
          backgroundImage: 'linear-gradient(to right, #cbd5e1 50%, rgba(255,255,255,0) 0%)',
          backgroundSize: '16px 1px',
          backgroundRepeat: 'repeat-x',
        }}
      />

      {/* Row 3: Payable Amount */}
      <div className="flex items-center justify-between py-1">
        <span className="font-normal text-slate-700 text-[13px]">مبلغ قابل پرداخت:</span>
        <div className="flex items-center gap-1">
          <span className="font-normal text-slate-900 text-[13px]">{totalPayable}</span>
          <span className="text-[13px] text-slate-400 font-normal">تومان</span>
        </div>
      </div>

      {/* Row 4: Payment Button */}
      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onCheckout}
          className="w-full bg-[#ff2d55] hover:bg-[#e02547] text-white font-kal-3 font-bold text-base py-3.5 rounded-xl shadow-[0_6px_20px_rgba(255,45,85,0.25)] text-center transition-all cursor-pointer"
        >
          پرداخت
        </motion.button>
      </div>
    </div>
  );
}

export default CartSummary;

