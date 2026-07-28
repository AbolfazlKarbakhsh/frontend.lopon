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
   <div className="relative my-4 min-h-[165px] sm:min-h-[180px] rounded-2xl bg-white shadow-2xs overflow-hidden">

  {/* Border Layer */}
  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[#cbd5e1]" />

{/* Left Ticket Cutout */}
<div className="absolute -left-[13px] top-[60%] -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-[#cbd5e1]">
  <div className="absolute inset-[1px] rounded-full bg-white" />
</div>

{/* Right Ticket Cutout */}
<div className="absolute -right-[13px] top-[60%] -translate-y-1/2 z-20 h-7 w-7 rounded-full bg-[#cbd5e1]">
  <div className="absolute inset-[1px] rounded-full bg-white" />
</div>

  {/* Content */}
  <div className="relative z-10 flex h-full min-h-[165px] flex-col justify-between p-3 sm:min-h-[180px] ">

    {/* TOP SECTION */}
    <div>

      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-4 sm:mb-[24px]">

        <h3 className="flex-1 text-right font-kal-3 text-sm font-bold leading-snug text-slate-800 sm:text-base">
          {order.title}
        </h3>

        <span
          className={`flex h-[26px] w-[90px] items-center justify-center rounded-[2px] rounded-br-[10px] rounded-tl-[10px] px-[16px] text-[10px] leading-none ${status.badgeClass}`}
        >
          {status.label}
        </span>

      </div>

      {/* Expiry */}
      <div className="mt-2 text-right font-kal-2 text-xs text-slate-400 sm:mt-3 sm:text-sm">
        <span className='text-[#64748b font-normal]'>مهلت استفاده: </span>
        <span className="font-medium text-slate-700">
          {order.expiryDate}
        </span>
      </div>

    </div>

    {/* Dashed Divider */}
    <div
      className="mt-3.5 border border-[#cbd5e1]"
      style={{
        borderStyle: "dashed",
        borderWidth: "1px",
        borderImage:
          "repeating-linear-gradient(to right, #cbd5e1 0 7px, transparent 7px 15px) 1",
      }}
    />

    {/* Bottom */}
    <div className="flex items-center justify-between pt-1">

      <div className="text-right font-kal-2 text-xs text-slate-500 sm:text-sm">
        <span>کد سفارش: </span>
        <span className="mr-0.5 font-kal-3 text-sm font-bold text-slate-800 sm:text-base">
          {order.code}
        </span>
      </div>

      {order.status === "pending" ? (
        <button
          onClick={() => alert("انتقال به درگاه پرداخت...")}
          className="cursor-pointer rounded-xl bg-[#ff0055] px-4 py-2 font-kal-3 text-xs font-bold text-white shadow-xs transition-colors active:scale-95 hover:bg-[#e0004c] sm:text-sm"
        >
          پرداخت سفارش
        </button>
      ) : (
        <button
          onClick={handleMapClick}
          className="flex cursor-pointer items-center gap-2 rounded-[8px] border border-slate-100 bg-[#f3f4f6] px-[32px] py-[9px] font-kal-3 text-xs font-medium text-slate-700 transition-colors active:scale-95 hover:bg-slate-200 sm:text-sm"
        >
          <LuMap className="h-4 w-4 text-[#64748b]" />
          <span className='text-[#64748b]'>مسیریابی مجموعه</span>
        </button>
      )}

    </div>

  </div>

</div>
  );
}

export default OrderItemCard;
