import React from 'react';
import { LuMap } from 'react-icons/lu';

const STATUS_CONFIG = {
  approved: {
    label: 'تایید شده',
    badgeClass: 'bg-[#d1f4d9] text-[#1e7e34]',
  },
  used: {
    label: 'استفاده شده',
    badgeClass: 'bg-[#f1f3f5] text-[#6c757d]',
  },
  canceled: {
    label: 'لغو شده',
    badgeClass: 'bg-[#fcd0d0] text-[#d93025]',
  },
  pending: {
    label: 'در انتظار پرداخت',
    badgeClass: 'bg-[#fef3c7] text-[#b45309]',
  },
};

function OrderItemCard({ order }) {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.approved;

  const handleMapClick = () => {
    if (order.mapUrl) {
      window.open(order.mapUrl, '_blank');
    } else {
      alert(`مسیریابی برای ${order.title}`);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden my-4 min-h-[165px] sm:min-h-[180px] flex flex-col justify-between">
      {/* Ticket Notch Cutouts on Left & Right aligned with dashed line */}
      <div className="absolute -left-3.5 top-[60%] -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 border border-slate-200/90 z-10" />
      <div className="absolute -right-3.5 top-[60%] -translate-y-1/2 w-6 h-6 rounded-full bg-slate-50 border border-slate-200/90 z-10" />

      <div className="p-5 sm:p-6 flex flex-col justify-between h-full">
        {/* TOP SECTION */}
        <div>
          {/* Header Row: Title on RIGHT (1st in RTL), Status Badge on LEFT (2nd in RTL) */}
          <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
            {/* Title (1st child in JSX = Right side in RTL) */}
            <h3 className="font-kal-3 font-bold text-slate-800 text-sm sm:text-base leading-snug text-right flex-1">
              {order.title}
            </h3>

            {/* Status Badge (2nd child in JSX = Left side in RTL) */}
            <span
              className={`flex items-center  justify-center leading-none text-[10px] px-[16px] w-[90px] h-[26px] rounded-[2px] rounded-tl-[10px] rounded-br-[10px] ${status.badgeClass}`}
            >
              {status.label}
            </span>
          </div>

          {/* Expiry Date (Right aligned in RTL) */}
          <div className="text-right text-xs sm:text-sm text-slate-400 font-kal-2 mt-2 sm:mt-3">
            <span>مهلت استفاده: </span>
            <span className="font-kal-2 text-slate-600 font-medium">{order.expiryDate}</span>
          </div>
        </div>

        {/* DASHED DIVIDER */}
        <div  className="border border-[#94A3B8] mt-5"
    style={{
      borderStyle: "dashed",
    borderWidth: "1px",
    borderImage: "repeating-linear-gradient(to right, #94A3B8 0 7px, transparent 7px 14px) 1",
    }} />

        {/* BOTTOM SECTION */}
        {/* Order Code on RIGHT (1st in RTL), Action Button on LEFT (2nd in RTL) */}
        <div className="flex items-center justify-between pt-1">
          {/* Order Code (1st child in JSX = Right side in RTL) */}
          <div className="text-right font-kal-2 text-xs sm:text-sm text-slate-500">
            <span>کد سفارش: </span>
            <span className="font-kal-3 font-bold text-slate-800 text-sm sm:text-base mr-0.5">{order.code}</span>
          </div>

          {/* Action Button (2nd child in JSX = Left side in RTL) */}
          {order.status === 'pending' ? (
            <button
              onClick={() => alert('انتقال به درگاه پرداخت...')}
              className="bg-[#ff0055] hover:bg-[#e0004c] text-white text-xs sm:text-sm font-kal-3 font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer active:scale-95"
            >
              پرداخت سفارش
            </button>
          ) : (
            <button
              onClick={handleMapClick}
              className="bg-[#f3f4f6] hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-kal-3 font-medium px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-100 transition-colors cursor-pointer active:scale-95"
            >
              <span>مسیریابی مجموعه</span>
              <LuMap className="w-4 h-4 text-slate-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderItemCard;
