import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { LuTrash2 } from 'react-icons/lu';

function CartItemCard({ item }) {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-xs flex gap-3.5 items-stretch transition-shadow hover:shadow-md">
      {/* Thumbnail Image */}
      <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h3 className="font-kal-3 font-bold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2">
            {item.title}
          </h3>
          <p className="text-[11px] text-gray-400 font-kal-2 mt-1">
            {item.businessName}
          </p>
        </div>

        {/* Prices and Quantity Row */}
        <div className="flex items-end justify-between mt-2 pt-1">
          {/* Prices */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-gray-400 line-through">
                {item.originalPrice}
              </span>
              <span className="bg-[#ff0055] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                {item.discountPercent}٪
              </span>
            </div>
            <span className="font-kal-3 font-bold text-gray-900 text-xs sm:text-sm mt-0.5">
              {item.discountedPrice} <span className="text-[10px] font-normal text-gray-500">تومان</span>
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2 py-1 bg-gray-50/60 shrink-0">
            <button
              onClick={handleIncrement}
              className="w-5 h-5 flex items-center justify-center text-gray-700 hover:text-[#ff0055] transition-colors cursor-pointer"
              aria-label="افزایش"
            >
              <FiPlus size={14} />
            </button>

            <span className="font-kal-3 font-bold text-gray-900 text-xs min-w-3 text-center">
              {quantity}
            </span>

            <button
              onClick={handleDecrement}
              className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="کاهش"
            >
              {quantity === 1 ? <LuTrash2 size={13} className="text-red-400" /> : <FiMinus size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
