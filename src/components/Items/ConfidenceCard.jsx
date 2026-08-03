import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ALL_WEEK_DAYS = [
  { dayNum: 1, day: 'شنبه' },
  { dayNum: 2, day: 'یکشنبه' },
  { dayNum: 3, day: 'دوشنبه' },
  { dayNum: 4, day: 'سه‌شنبه' },
  { dayNum: 5, day: 'چهارشنبه' },
  { dayNum: 6, day: 'پنج‌شنبه' },
  { dayNum: 7, day: 'جمعه' },
];

export default function ConfidenceCard({ workingDays }) {
  const [isOpen, setIsOpen] = useState(true);

  let hoursList = [];
  if (workingDays && Array.isArray(workingDays) && workingDays.length > 0) {
    const daysMap = new Map();
    workingDays.forEach((w) => {
      const d = Number(w.day);
      if (d >= 1 && d <= 7) {
        const timeStr = w.from && w.to ? `${w.from} – ${w.to}` : (w.time || 'تعطیل');
        daysMap.set(d, timeStr);
      }
    });

    hoursList = ALL_WEEK_DAYS.map((d) => ({
      day: d.day,
      time: daysMap.has(d.dayNum) ? daysMap.get(d.dayNum) : 'تعطیل',
    }));
  } else {
    hoursList = [
      { day: 'شنبه', time: '۱۰:۰۰ – ۲۱:۰۰' },
      { day: 'یکشنبه', time: '۱۰:۰۰ – ۲۱:۰۰' },
      { day: 'دوشنبه', time: '۱۰:۰۰ – ۲۱:۰۰' },
      { day: 'سه‌شنبه', time: '۱۰:۰۰ – ۲۱:۰۰' },
      { day: 'چهارشنبه', time: '۱۰:۰۰ – ۲۱:۰۰' },
      { day: 'پنج‌شنبه', time: '۱۰:۰۰ – ۲۱:۰۰' },
      { day: 'جمعه', time: '۱۲:۰۰ – ۱۸:۰۰' },
    ];
  }

  return (
    <div className="mx-4 mt-6 space-y-6" dir="rtl">
      {/* Collapsible Confidence Banner */}
      <div className="filter drop-shadow-[0_8px_16px_rgba(16,185,129,0.1)]">
        <div className="bg-[#bbf7d0] rounded-2xl overflow-hidden transition-all">
          {/* Banner Header Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-4 text-right cursor-pointer select-none"
          >
            {/* Right side: Title */}
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-800 flex-shrink-0" />
              <span className="font-extrabold text-sm text-emerald-950">
                با اطمینان خرید کنید!
              </span>
            </div>

            {/* Left side: Chevron icon */}
            <div className="text-emerald-800">
              {isOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </button>

          {/* Collapsible Content */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-0 text-xs text-emerald-900/90 leading-relaxed font-medium">
                  در صورت عدم استفاده از کوپن خریداری شده در مدت زمان مقرر و یا وجود مغایرت بین خدمات دریافتنی با توضیحات و شرایط موجود در سایت، پس از تایید کارشناس،
                  <span className="font-extrabold text-emerald-950 mx-1">بازگشت ۱۰۰٪ وجه تضمین می‌گردد.</span>
                  تمدید کوپن منقضی شده فقط درصورت عدم تغییر قیمت خدمات مورد نظر امکان پذیر می‌باشد.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Working Hours Section */}
      <div className="space-y-3 pt-2">
        <h3 className="text-base font-extrabold text-slate-800 text-right pr-1">
          ساعت های کاری
        </h3>

        {/* Horizontal Scrollable Row for Days */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 text-right">
          {hoursList.map((item, index) => (
            <div
              key={index}
              className="w-[70px] min-w-[70px] h-[67px] bg-slate-100 rounded-[7px] flex flex-col justify-center items-center text-center p-1 flex-shrink-0 select-none"
            >
              <span className="text-[10px] text-slate-500 font-normal mb-1">
                {item.day}
              </span>
              <span className="text-[11px] font-normal text-slate-900 leading-tight">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
