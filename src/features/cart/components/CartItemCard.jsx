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
    <div className="py-5 border-b border-slate-100 last:border-none flex justify-between items-start gap-4">
      {/* RIGHT SIDE in RTL: Image & Quantity Pill Counter */}
      <div className="flex flex-col items-center shrink-0 w-24 sm:w-28">
        <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quantity Pill Counter directly under image on the RIGHT */}
        <div className="w-24 sm:w-28 mt-2.5 flex items-center justify-between border border-slate-300 rounded-full px-2.5 py-1 bg-white shadow-2xs text-slate-700">
          <button
            onClick={() => onDecrement?.(item.id)}
            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors cursor-pointer"
            aria-label="کاهش"
          >
            {quantity === 1 ? (
              <LuTrash2 size={13} className="text-red-500" />
            ) : (
              <FiMinus size={13} />
            )}
          </button>

          <span className="font-kal-3 font-bold text-slate-800 text-xs sm:text-sm min-w-4 text-center">
            {toPersianDigits(quantity)}
          </span>

          <button
            onClick={() => onIncrement?.(item.id)}
            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-[#ff0055] transition-colors cursor-pointer"
            aria-label="افزایش"
          >
            <FiPlus size={13} />
          </button>
        </div>
      </div>

      {/* LEFT SIDE in RTL: Title, Subtitle & Price Section */}
      <div className="flex flex-col justify-between items-end self-stretch min-w-0 flex-1 py-0.5">
        {/* Title & Subtitle (aligned right for Persian readability) */}
        <div className="w-full text-right">
          <h3 className="font-kal-3 font-bold text-slate-800 text-xs sm:text-sm leading-relaxed">
            {item.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 font-kal-2 mt-1">
            {item.businessName}
          </p>
        </div>

        {/* Price Section: All elements aligned to the LEFT (opposite to image/quantity) */}
        <div className="mt-4 flex flex-col items-end w-full">
          {/* Original Price (Left aligned) */}
          <div className="text-[11px] sm:text-xs text-slate-400 line-through font-kal-2 mb-1 text-left">
            {item.originalPrice}
          </div>

          {/* Discount Badge & Discounted Price (Left aligned row) */}
          <div className="flex items-center gap-2">
            <span className="font-kal-3 font-bold text-slate-900 text-sm sm:text-base">
              {item.discountedPrice} <span className="text-[10px] sm:text-xs font-normal text-slate-500 font-kal-2">تومان</span>
            </span>
            <span className="bg-[#ff0055] text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full leading-none font-kal-3">
              {item.discountPercent}٪
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
