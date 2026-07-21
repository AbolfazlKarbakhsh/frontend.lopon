import React from 'react';
import { X, Calendar, AlertTriangle, CheckSquare, Award } from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 text-right relative shadow-2xl scale-up">
        {/* Close Button */}
        <button
          id="close-terms-btn"
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-150 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-base font-black text-gray-800 mb-4 pl-8">قوانین و شرایط استفاده</h3>
        
        <div className="space-y-4 max-h-96 overflow-y-auto pl-1 pr-1 font-medium text-gray-600 text-xs leading-relaxed">
          
          <div className="flex gap-2 items-start justify-end">
            <div>
              <p className="font-bold text-gray-800 mb-0.5">مدت اعتبار کوپن‌ها</p>
              <p className="text-gray-500">تمامی کوپن‌های خریداری شده تا پایان ماه جاری معتبر بوده و پس از آن منقضی می‌گردند.</p>
            </div>
            <Calendar className="w-4.5 h-4.5 text-blue-500 flex-shrink-0 mt-0.5" />
          </div>

          <div className="flex gap-2 items-start justify-end">
            <div>
              <p className="font-bold text-gray-800 mb-0.5">رزرو نوبت تلفنی</p>
              <p className="text-gray-500">حداقل ۲۴ ساعت پیش از حضور، جهت رزرو قطعی ساعت خدمات دریافتی با پذیرش تماس حاصل فرمایید.</p>
            </div>
            <CheckSquare className="w-4.5 h-4.5 text-blue-500 flex-shrink-0 mt-0.5" />
          </div>

          <div className="flex gap-2 items-start justify-end">
            <div>
              <p className="font-bold text-gray-800 mb-0.5">ضمانت عودت وجه ۱۰۰٪</p>
              <p className="text-gray-500">در صورت تغییر شرایط سالن یا مغایرت خدمات با فاکتور صادر شده، کل مبلغ پرداختی به کارت شما عودت داده می‌شود.</p>
            </div>
            <Award className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
          </div>

          <div className="flex gap-2 items-start justify-end">
            <div>
              <p className="font-bold text-gray-800 mb-0.5">انتقال کوپن به غیر</p>
              <p className="text-gray-500">انتقال کوپن خریداری شده به دوستان یا بستگان بلامانع است؛ کافی است کد دریافتی را به پذیرش ارائه دهند.</p>
            </div>
            <AlertTriangle className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
          </div>

        </div>

        {/* Action Button */}
        <button
          id="accept-terms-btn"
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gray-900 hover:bg-gray-800 text-white text-xs font-black rounded-2xl transition-all cursor-pointer text-center"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
}
