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
      <div className="relative my-4 rounded-2xl bg-[#f4f5f8] overflow-hidden">

  {/* Border Layer */}
  <div className="pointer-events-none absolute inset-0 rounded-2xl " />

  {/* Left Ticket Cutout */}
  <div className="absolute -left-[13px] top-[calc(50%+2px)] -translate-y-1/2 z-20 h-7 w-7 rounded-full ">
    <div className="absolute inset-[1px] rounded-full bg-white" />
  </div>

  {/* Right Ticket Cutout */}
  <div className="absolute -right-[13px] top-[calc(50%+2px)] -translate-y-1/2 z-20 h-7 w-7 rounded-full ">
    <div className="absolute inset-[1px] rounded-full bg-white" />
  </div>

  {/* Content */}
  <div className="relative z-10 p-3.5 sm:p-5">

    {/* Row 1 */}
<div className='pb-2'>
    <div className="pb-2 flex items-center justify-between text-xs sm:text-sm text-slate-500 font-kal-2  ">
      <span className='text-[14px] '>جمع کل سفارشات:</span>

      <span className="text-[18px]  text-slate-700">
        {totalOriginal}
        <span className="mr-1 text-[10px] sm:text-[11px] font-normal text-slate-400 font-kal-2">
          تومان
        </span>
      </span>
    </div>
    
    

    {/* Row 2 */}
    <div className="mt-2 sm:mt-3 flex items-center justify-between text-xs sm:text-sm text-slate-500 font-kal-2 ">
      <span className='text-[14px]'>مجموع کل تخفیف:</span>

      <span className="text-[18px]  text-slate-700">
        {totalDiscount}
        <span className="mr-1 text-[10px] sm:text-[11px] font-normal text-slate-400 font-kal-2">
          تومان
        </span>
      </span>
    </div>
</div>

    {/* Dashed Divider */}
<div
  className="absolute left-0 right-0 top-[55%] z-10 border border-[#cbd5e1] "
  style={{
    borderStyle: "dashed",
    borderWidth: "1px",
    borderImage:
      "repeating-linear-gradient(to right, #cbd5e1 0 7px, transparent 7px 15px) 1",
  }}
/>

    {/* Row 3 */}
    <div className="mt-4 flex items-center justify-between font-kal-3 text-xs sm:text-sm font-bold text-slate-700 py-4 ">

      <span className=" text-slate-500 text-[16px]">
        مبلغ قابل پرداخت:
      </span>

      <span className="text-[18px] font-normal text-slate-900">
        {totalPayable}
        <span className="mr-1 text-[10px] sm:text-[11px] font-normal text-slate-500 font-kal-2">
          تومان
        </span>
      </span>

    </div>

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
