import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, MapPin, Map, House, Clock, Ticket } from 'lucide-react';

function CompletedOrderItemCard({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const handleCall = () => {
    if (order.phone) {
      window.location.href = `tel:${order.phone.replace(/[^0-9]/g, '')}`;
    } else {
      alert(`تماس با ${order.salonName || order.title}`);
    }
  };

  const handleMap = () => {
    alert(`مسیریابی برای ${order.salonName || order.title}`);
  };

  const toggleAccordion1 = (e) => {
    e.stopPropagation();
    setIsDetailsOpen(!isDetailsOpen);
  };

  const toggleAccordion2 = (e) => {
    e.stopPropagation();
    setIsInvoiceOpen(!isInvoiceOpen);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 my-3 shadow-xs transition-all duration-300">
      {/* Top Header Section */}
      <div className="flex items-start justify-between gap-3 mb-5">
        {/* Title */}
        <h3 className="font-kal-3 font-bold text-slate-800 text-lg sm:text-xl text-right leading-snug">
          {order.title || 'کاشت ناخن نانو لایه'}
        </h3>

        {/* Order Code Badge (Visible in All States) */}
        <div className="bg-[#fff0f3] text-[#e0315a] px-3 py-1.5 rounded-lg text-[10px] font-kal-3 whitespace-nowrap shrink-0">
          <span>کد سفارش: </span>
          <span className="font-bold text-[13px]  mr-0.5">{order.orderCode || '۱۲۳۲۲۳۴'}</span>
        </div>
      </div>

      {/* Salon Name & Expiry Date */}
      <div className="space-y-3 text-right text-sm sm:text-base text-slate-700 font-kal-2 mb-5">
        <div className="flex items-center gap-2.5 justify-start">
          <House className="w-5 h-5 text-slate-400 shrink-0" />
          <span>{order.salonName || 'آرایشگاه زیباکده کرمانیان'}</span>
        </div>
        <div className="flex items-center gap-2.5 justify-start">
          <Clock className="w-5 h-5 text-slate-400 shrink-0" />
          <span>مهلت استفاده: </span>
          <span className="font-medium text-slate-800">{order.expiryDays || '۱۲ روز باقی مانده'}</span>
        </div>
      </div>

      {/* EXPANDED CONTENT (State 2 & 3) */}
      {isExpanded && (
        <>
          <div className="border-t border-slate-100 my-3" />

          {/* Pink Ticket Voucher Block */}
          <div className="my-4">
            <div className="relative bg-[#fff0f3] rounded-2xl px-4 py-3.5 flex items-center justify-between font-kal-3 overflow-hidden">
              {/* Top & Bottom cutout notches (~70% from right = 30% from left in LTR/RTL) */}
              <div className="absolute -top-2.5 left-[30%] -translate-x-1/2 w-5 h-5 rounded-full bg-white" />
              <div className="absolute -bottom-2.5 left-[30%] -translate-x-1/2 w-5 h-5 rounded-full bg-white" />

              {/* Right Side in RTL: Label and Ticket Icon */}
              <div className="flex items-center gap-2 text-[#e0315a] font-bold text-sm sm:text-base">
                <Ticket className="w-5 h-5 shrink-0" />
                <span>کد ارائه هنگام پذیرش:</span>
              </div>

              {/* Left Side in RTL: Admission Code */}
              <div className="text-[#e0315a] font-bold text-base sm:text-lg tracking-wider">
                {order.admissionCode || '۵۳۸۲۳۴۰۹۲'}
              </div>
            </div>

            {/* Notice text below the punch card */}
            <p className="text-[11px] sm:text-xs text-slate-500 font-kal-2 text-center mt-2.5 leading-relaxed max-w-xs sm:max-w-sm mx-auto">
              هنگام مراجعه به مجموعه {order.salonName || 'آرایشگاه محدثه کرمانی'} این کد سفارش را جهت استعلام به مسئول پذیرش نشان دهید
            </p>
          </div>

          <div className="border-t border-slate-100 my-3" />

          {/* Accordion 1: مشخصات مجموعه */}
          <div className="py-1">
            <button
              type="button"
              onClick={toggleAccordion1}
              className="w-full flex items-center justify-between py-2 text-right cursor-pointer"
            >
              <span className="font-kal-3 font-bold text-slate-800 text-sm sm:text-base">
                مشخصات مجموعه:
              </span>
              {isDetailsOpen ? (
                <ChevronUp className="w-5 h-5 text-slate-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {isDetailsOpen && (
              <div className="mt-2 space-y-4 pt-1 pb-2">
                {/* Working Days Horizontal Scroll */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-2">
                  {(order.workingDays || [
                    { day: 'یکشنبه', time: '۱۰:۰۰ الی ۲۱:۰۰' },
                    { day: 'دوشنبه', time: '۱۰:۰۰ الی ۲۱:۰۰' },
                    { day: 'سه‌شنبه', time: '۱۰:۰۰ الی ۲۱:۰۰' },
                    { day: 'چهارشنبه', time: '۱۰:۰۰ الی ۲۱:۰۰' },
                  ]).map((item, idx) => {
                    const dayName = typeof item === 'string' ? item.split(' ')[0] : item.day;
                    const timeRange = typeof item === 'string' ? item.substring(item.indexOf(' ') + 1) : item.time;
                    return (
                      <div
                        key={idx}
                        className="px-3.5 py-2.5 bg-white border border-slate-200/90 rounded-[8px] text-center flex flex-col items-center justify-center min-w-[105px] shrink-0"
                      >
                        <span className="text-[12px] text-slate-400 font-kal-2 mb-1">{dayName}</span>
                        <span className="text-[12px] sm:text-xs text-slate-800 font-normal font-kal-2 whitespace-nowrap">{timeRange}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-700 font-kal-2 pt-1">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-medium text-slate-800">شماره تماس برای هماهنگی:</span>
                  </div>
                  <span className="font-normal text-slate-800 dir-ltr">{order.phone || '۰۳۴-۳۳۷۲۹۱۸۲'}</span>
                </div>

                {/* Address */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-700 font-kal-2">
                  <div className="flex items-center gap-2 text-slate-700 shrink-0">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="font-medium text-slate-800">نشانی مجموعه:</span>
                  </div>
                  <span className="font-normal text-slate-800 text-left mr-2">{order.address || 'کرمان خیابان جهاد ۵۶ نبش کوچه'}</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 my-2" />

          {/* Accordion 2: صورت حساب ها */}
          <div className="py-1">
            <button
              type="button"
              onClick={toggleAccordion2}
              className="w-full flex items-center justify-between py-2 text-right cursor-pointer"
            >
              <span className="font-kal-3 font-bold text-slate-800 text-sm sm:text-base">
                صورت حساب ها:
              </span>
              {isInvoiceOpen ? (
                <ChevronUp className="w-5 h-5 text-slate-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {isInvoiceOpen && (
              <div className="mt-2 space-y-2.5 pt-1 pb-2 font-kal-2">
                {/* Total */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 py-1">
                  <span className="text-slate-700">جمع کل سفارشات:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-normal text-slate-800 text-sm sm:text-base">
                      {order.totalAmountRaw || '۲۷۷,۵۰۰'}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">تومان</span>
                  </div>
                </div>

                {/* Savings / Discount in Green Box (8px border radius = rounded-[8px]) */}
                <div className="bg-[#e8f8ee] rounded-[8px] px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm text-[#1e8e4a] my-1">
                  <span className="font-medium">سود شما از خرید:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-normal text-[#1e8e4a] text-sm sm:text-base">
                      {order.discountProfitRaw || '۲۷۷,۵۰۰'}
                    </span>
                    <span className="text-xs text-[#1e8e4a]/70 font-normal">تومان</span>
                  </div>
                </div>

                {/* Dashed line with wider dashes */}
                <div
                  className="my-3 h-[1px] w-full"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #cbd5e1 50%, rgba(255,255,255,0) 0%)',
                    backgroundSize: '16px 1px',
                    backgroundRepeat: 'repeat-x',
                  }}
                />

                {/* Payable Amount */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-800 py-1">
                  <span className="font-medium text-slate-800">مبلغ قابل پرداخت:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-normal text-slate-900 text-base sm:text-lg">
                      {order.payableAmountRaw || '۱۲,۵۰۰,۰۰۰'}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">تومان</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Action Buttons Row: تماس با مجموعه & مسیریابی مجموعه */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-2">
        {/* Right (in RTL): Contact Salon */}
        <button
          type="button"
          onClick={handleCall}
          className="flex-1 bg-[#f4f5f7] hover:bg-slate-200 text-slate-700 py-3 px-3 rounded-[8px] text-xs sm:text-sm font-kal-3 font-medium flex items-center justify-center gap-2 border border-slate-100/60 transition-colors cursor-pointer"
        >
          <Phone className="w-4.5 h-4.5 text-slate-700" />
          <span>تماس با مجموعه</span>
        </button>

        {/* Left (in RTL): Navigation */}
        <button
          type="button"
          onClick={handleMap}
          className="flex-1 text-slate-700 hover:text-slate-900 py-3 px-3 rounded-2xl text-xs sm:text-sm font-kal-3 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Map className="w-4.5 h-4.5 text-slate-600" />
          <span>مسیریابی مجموعه</span>
        </button>
      </div>

      {/* Full Width Collapse/Expand Button */}
      <button
        type="button"
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (isExpanded) {
            setIsDetailsOpen(false);
            setIsInvoiceOpen(false);
          }
        }}
        className="w-full mt-4 py-2.5 px-4 border border-slate-200/90 rounded-[8px] text-slate-600 hover:text-slate-900 font-kal-3 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <span>{isExpanded ? 'جزئیات کمتر' : 'جزئیات بیشتر'}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-600" />
        )}
      </button>
    </div>
  );
}

export default CompletedOrderItemCard;
