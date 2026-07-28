import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { LuTrash2 } from 'react-icons/lu';

const toPersianDigits = (num) => {
  if (num === null || num === undefined) return '۰';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

function CartItemCard({ item, onIncrement, onDecrement }) {
  const quantity = item.quantity || 1;

  return (
    <div className="py-5 px-5 bg-white border-b border-slate-100 last:border-none flex justify-between items-start gap-4">
      {/* RIGHT SIDE in RTL: Image & Quantity Pill Counter */}
      <div className="flex flex-col items-center shrink-0 w-24 sm:w-28">
        <div className="w-[118px] h-[84px] sm:w-28 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border border-gray-700 ">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quantity Pill Counter directly under image on the RIGHT */}
        <div className="w-[112px] h-[42px] sm:w-28 mt-2.5 flex items-center justify-between border border-slate-300 rounded-full px-2.5 py-1 bg-white shadow-2xs text-slate-700">

           <button
            onClick={() => onIncrement?.(item.id)}
            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-[#ff0055] transition-colors cursor-pointer"
            aria-label="افزایش"
          >
            <FiPlus size={20} />
          </button>

          <span className="font-kal-3 font-bold text-slate-800 text-[16px] sm:text-sm min-w-4 text-center">
            {toPersianDigits(quantity)}
          </span>

             <button
            onClick={() => onDecrement?.(item.id)}
            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
            aria-label="کاهش"
          >
            
              <FiMinus size={20} />
            
          </button>


        </div>
      </div>

      {/* LEFT SIDE in RTL: Title, Subtitle & Price Section */}
      <div className="flex flex-col justify-between items-end self-stretch min-w-0 flex-1 py-0.5">
        {/* Title & Subtitle (aligned right for Persian readability) */}
        <div className="w-full text-right">
          <h3 className="font-kal-3 font-medium text-slate-800 text-[16px] sm:text-[16px] leading-relaxed">
            {item.title}
          </h3>
          <p className="text-[14px] sm:text-[14px] text-slate-400 font-kal-2 mt-1">
            {item.businessName}
          </p>
        </div>

        {/* Price Section: All elements aligned to the LEFT (opposite to image/quantity) */}
        <div className="mt-4 flex flex-col items-end w-full">
          {/* Original Price (Left aligned) */}
             <div className="relative inline-block text-[14px] sm:text-[14px] text-slate-400 font-kal-2 mb-1 text-left">
             <span>{item.originalPrice}</span>
            <span className="absolute inset-0 flex items-center">
             <span className="w-full h-px bg-slate-400 -rotate-[22deg]"></span>
            </span>
            </div>

          {/* Discount Badge & Discounted Price (Left aligned row) */}
          <div className="flex items-center justify-center gap-2">
            <span className="flex justify-center items-center bg-red-500 w-[40px] h-[26px] text-white text-[13px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full  font-kal-3">
              {item.discountPercent}٪ 
            </span>
            <span className="font-kal-3 font-bold text-slate-900 text-sm sm:text-[17px]">
              {item.discountedPrice} <span className="text-[10px] sm:text-xs font-normal text-slate-500 font-kal-2">تومان</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
