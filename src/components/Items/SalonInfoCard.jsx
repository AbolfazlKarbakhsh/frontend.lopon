import { MapPin, Clock, Star } from 'lucide-react';

const DotLine = () => {
  return (
    <div className="relative h-px w-full ">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#f8fafc] border-r border-slate-500 rounded-full z-10" />
      <div className="absolute inset-0 border-t-[2.3px] border-dashed border-slate-300" />
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#f8fafc] border-l border-slate-500 rounded-full z-10" />
    </div>
  )
}
export default function SalonInfoCard({ name, serviceTitle, address, time, rate, discount, purchasesCount }) {
  return (
    <div className="relative -mt-14 mx-4 z-20 bg-white rounded-3xl shadow-lg border border-gray-100 p-4 pb-0 px-2">

      {/* Salon Name Heading & Service Title */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-black text-slate-800 tracking-tight select-none">
          {name || "مجموعه زیبایی بیوتی کرمان"}
        </h1>
        {serviceTitle && (
          <p className="text-xs font-bold text-[#ff1461] mt-1.5 font-kal-3">
            {serviceTitle}
          </p>
        )}
      </div>

      <DotLine />

      {/* Address & Hours section - strictly aligned to Persian RTL */}
      <div className="space-y-2 my-4 text-[.8rem] text-slate-600 px-1 text-right">

        <div className="flex items-center gap-1 justify-start">
          <div className="flex items-center justify-center w-7 h-7 rounded-full text-slate-400 flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-slate-500 leading-relaxed">
            {address || "خیابان قرنی کوچه شماره ۲۲"}
          </span>
        </div>

        <div className="flex items-center gap-1 justify-start">
          <div className="flex items-center justify-center w-7 h-7 rounded-full text-slate-400 flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-500">
            {time || "ساعت ۱۲ ظهر تا ۴ عصر"}
          </span>
        </div>
      </div>

      <DotLine />

      <div className="flex justify-between items-stretch text-center ">

        <div className="flex-1 flex flex-col justify-center items-center pb-3 pt-5">
          <span className="text-md font-black text-slate-500 tracking-tight select-none leading-none">
            {purchasesCount ? purchasesCount.toLocaleString('fa-IR') : "۱۲۰"}
          </span>
          <span className="text-[10px] font-bold text-slate-500 mt-1.5 whitespace-nowrap">
            خرید موفق
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center border-r-2 border-dashed border-slate-300 pb-3 pt-5">
          <div className="flex items-center gap-1 justify-center leading-none">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 mb-1" />
            <span className="text-md font-black text-slate-500 tracking-tight leading-none">
              {rate ? rate.toLocaleString('fa-IR') : "۴.۵"}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center border-s-2 border-dashed border-slate-300 pb-3 pt-5">
          <div className="flex gap-1 items-center ">
            <span className="text-md font-black text-rose-500 ">
              تا
            </span>
            <span className="text-md font-black text-rose-500 ">
              {discount ? (typeof discount === 'number' ? discount.toLocaleString('fa-IR') : discount) : "۶۰"}٪
            </span>
          </div>
          <span className="text-md font-extrabold text-rose-500 whitespace-nowrap">
            تخفیف
          </span>
        </div>

      </div>

    </div>
  );
}
