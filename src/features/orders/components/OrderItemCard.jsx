import React from 'react';
import { FiMapPin } from 'react-icons/fi';

const STATUS_CONFIG = {
  approved: {
    label: 'تایید شده',
    badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  pending: {
    label: 'در انتظار پرداخت',
    badgeClass: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  used: {
    label: 'استفاده شده',
    badgeClass: 'bg-gray-100 text-gray-500 border-gray-200',
  },
  canceled: {
    label: 'لغو شده',
    badgeClass: 'bg-red-50 text-red-500 border-red-200',
  },
};

function OrderItemCard({ order }) {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.approved;

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-3 transition-shadow hover:shadow-md">
      {/* Header Row: Title & Status Badge */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-kal-3 font-bold text-gray-900 text-xs sm:text-sm leading-snug">
          {order.title}
        </h3>

        <span
          className={`shrink-0 text-[11px] font-kal-3 font-medium px-2.5 py-0.5 rounded-lg border ${status.badgeClass}`}
        >
          {status.label}
        </span>
      </div>

      {/* Expiry Date */}
      <p className="text-xs text-gray-400 font-kal-2">
        مهلت استفاده: <span className="font-kal-2">{order.expiryDate}</span>
      </p>

      {/* Bottom Footer Row: Order Code & Action Button */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <span className="text-xs text-gray-500 font-kal-2">
          کد سفارش: <span className="font-kal-3 font-bold text-gray-700">{order.code}</span>
        </span>

        {order.status === 'pending' ? (
          <button className="bg-[#ff0055] hover:bg-[#e0004c] text-white text-xs font-kal-3 font-bold px-5 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer active:scale-[0.98]">
            پرداخت
          </button>
        ) : (
          <button className="border border-gray-200 bg-gray-50/50 hover:bg-gray-100 text-gray-600 text-xs font-kal-2 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer">
            <FiMapPin size={14} className="text-gray-500" />
            <span>مسیریابی مجموعه</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderItemCard;
