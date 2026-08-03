import React from 'react';
import { MapPin, ShieldCheck, Star, Tag, Phone } from 'lucide-react';

export default function SalonInfoCard({ name, address, rate, discount, category, phone }) {
  return (
    <div className="relative -mt-[70px] mx-4 z-20 filter drop-shadow-[0_12px_24px_rgba(15,23,42,0.14)]">
      <div
        className="bg-white rounded-[16px] overflow-hidden border border-slate-100/80"
        style={{
          WebkitMaskImage: `
            radial-gradient(circle 9px at 0px 64px, transparent 8.5px, black 9px),
            radial-gradient(circle 9px at 100% 64px, transparent 8.5px, black 9px)
          `,
          maskImage: `
            radial-gradient(circle 9px at 0px 64px, transparent 8.5px, black 9px),
            radial-gradient(circle 9px at 100% 64px, transparent 8.5px, black 9px)
          `,
          WebkitMaskComposite: 'destination-in',
          maskComposite: 'intersect',
        }}
      >
        {/* Section 1: Salon Name */}
        <div className="text-center py-4 px-4 min-h-[64px] flex flex-col items-center justify-center">
          <h1 className="text-lg font-black text-slate-800 tracking-tight select-none">
            {name || "مجموعه زیبایی بیوتی کرمان"}
          </h1>
          {category && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full mt-1">
              <Tag className="w-3 h-3" />
              <span>{category}</span>
            </span>
          )}
        </div>

        {/* Divider 1 */}
        <div className="w-full px-2 h-[1px] flex items-center">
          <svg className="w-full h-[2px] overflow-visible" preserveAspectRatio="none">
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="15 10"
              strokeLinecap="square"
            />
          </svg>
        </div>

        {/* Section 2: Address & Phone */}
        <div className="space-y-2.5 py-3.5 px-5 text-xs text-slate-600 text-right flex flex-col justify-center">
          <div className="flex items-start gap-2.5 justify-start">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span className="font-bold text-slate-700 leading-relaxed">
              {address || "خیابان قرنی کوچه شماره ۲۲"}
            </span>
          </div>

          {phone && (
            <div className="flex items-center gap-2.5 justify-start">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="font-bold text-slate-600 dir-ltr">
                {phone}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2.5 justify-start">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span className="font-bold text-slate-600">
              تضمین کیفیت و اصالت لوپُن
            </span>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="w-full px-2 h-[1px] flex items-center">
          <svg className="w-full h-[2px] overflow-visible" preserveAspectRatio="none">
            <line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="15 10"
              strokeLinecap="square"
            />
          </svg>
        </div>

        {/* Section 3: Bottom Rating & Discount */}
        <div className="relative flex justify-between items-center py-3.5 px-2 text-center min-h-[64px]">
          {/* Vertical Dashed Line Divider */}
          <div className="absolute inset-y-0 right-1/2 translate-x-1/2 w-[2px] pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="10 8"
                strokeLinecap="square"
              />
            </svg>
          </div>

          {/* Right side (RTL): Rating */}
          <div className="flex-1 flex items-center justify-center gap-2 pr-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-xl font-black text-slate-700">
              {rate ? (typeof rate === 'number' ? rate.toLocaleString('fa-IR') : rate) : "۴.۵"}
            </span>
          </div>

          {/* Left side (RTL): Discount */}
          <div className="flex-1 flex flex-col justify-center items-center text-rose-600 pl-2">
            <div className="flex gap-1 items-center leading-none text-xl font-black">
              <span>تا</span>
              <span>{discount ? (typeof discount === 'number' ? discount.toLocaleString('fa-IR') : discount) : "۰"}٪</span>
            </div>
            <span className="text-xs font-black mt-1">
              تخفیف
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



