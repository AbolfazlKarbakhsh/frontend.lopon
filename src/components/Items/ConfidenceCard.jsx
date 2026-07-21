import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function ConfidenceCard() {
  return (
    <div className="mx-4 mt-6 bg-emerald-50/60 border border-emerald-100/50 rounded-3xl p-5 shadow-xs text-right" dir="rtl">
      <div className="flex items-center gap-2 mb-3 justify-start text-emerald-800">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <h3 className="font-black text-sm">با اطمینان خرید کنید!</h3>
      </div>

      <p className="text-xs text-emerald-700/80 leading-relaxed font-medium">
        در صورت عدم استفاده از کوپن خریداری شده در مدت زمان مقرر و یا وجود مغایرت بین خدمات دریافتنی با توضیحات و شرایط موجود در سایت، پس از تایید کارشناس،
        <span className="font-black text-emerald-800 mx-1">بازگشت ۱۰۰٪ وجه تضمین می‌گردد.</span>
        تمدید کوپن منقضی شده فقط درصورت عدم تغییر قیمت خدمات مورد نظر امکان پذیر می‌باشد.
      </p>
    </div>
  );
}
