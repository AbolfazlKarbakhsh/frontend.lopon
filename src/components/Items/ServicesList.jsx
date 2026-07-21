import React, { useState } from 'react';
import { HelpCircle, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
const DotLine = () => {
  return (
    <div className="relative h-px w-full mb-6 ">
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#f8fcff] border-r border-slate-400 rounded-full z-10" />
      <div className="absolute inset-0 border-t-[2.3px] border-dashed border-slate-300" />
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#f8fcff] border-l border-slate-400 rounded-full z-10" />
    </div>
  )
}
export default function ServicesList({
  services,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenTermsModal,
}) {
  const [showAll, setShowAll] = useState(false);

  // Initial count is 4 in the screenshot! Let's show 4 items initially.
  const displayedServices = showAll ? services : services.slice(0, 4);

  return (
    <div className="mx-4 mt-10 p-6  bg-white rounded-3xl shadow-lg border border-gray-100">
      
      {/* Services Title and "Terms" trigger */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-black text-slate-850">خدمات:</h2>
        
        <button
          id="terms-conditions-btn"
          onClick={onOpenTermsModal}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-600 font-extrabold transition-all cursor-pointer"
        >
          <span>شرایط استفاده</span>
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

    <DotLine />

      {/* Services List stacked with precise divider lines */}
      <div className="space-y-5">
        {displayedServices.map((service, idx) => {
          const qty = cart[service.id] || 0;
          return (
            <div key={service.id} className="text-right">
              
              <div className="flex items-center justify-between pb-5">
                
                {/* Right side: Title & Both original/discounted prices. Renders on the right under RTL. */}
                <div className="flex-1 text-right pl-3">
                  <h3 className="text-sm font-bold text-slate-500 mb-1 leading-snug">
                    {service.name}
                  </h3>
                      <div className="flex flex-col gap-0.5">
                    {/* Original Price (with line-through) */}
                    <span className="text-[10px] text-slate-400 line-through tracking-wider">
                      {service.originalPrice.toLocaleString('fa-IR')}
                    </span>
                    {/* Discounted Price */}
                    <span className="text-sm font-black text-slate-500  tracking-tight">
                      {service.discountedPrice.toLocaleString('fa-IR')}{' '}
                      <span className="text-[12px] text-slate-500 font-normal">ریال</span>
                    </span>
                  </div>
                </div>

              

                {/* Left side: Add or Counter Buttons. Renders on the left under RTL. */}
                <div className="flex items-center">
                  {qty > 0 ? (
                    <div className="flex items-center bg-rose-50 border border-rose-100 rounded-xl p-1 gap-2">
                      <button
                        id={`inc-${service.id}`}
                        onClick={() => onAddToCart(service.id)}
                        className="w-8 h-8 flex items-center justify-center bg-[#ff1461] hover:bg-[#e00c50] text-white rounded-lg transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-black text-slate-800 w-5 text-center font-mono">
                        {qty}
                      </span>
                      <button
                        id={`dec-${service.id}`}
                        onClick={() => onRemoveFromCart(service.id)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-lg transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      id={`add-btn-${service.id}`}
                      onClick={() => onAddToCart(service.id)}
                      className="px-4 py-3 bg-[#ff1461] hover:bg-[#e00c50] active:scale-95 text-white text-xs font-black rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      افزودن
                    </button>
                  )}
                </div>

              </div>

              <div className="border-t-2 border-dashed border-slate-300 w-full" />
            </div>
          );
        })}
      </div>

      {/* Show more/less toggle button exactly styled as requested */}
      <div className="pt-5">
        <button
          id="toggle-services-btn"
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3.5 border border-slate-300 rounded-xl text-xs font-black text-slate-605 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <span>{showAll ? 'مشاهده خدمات کمتر' : 'سایر خدمات'}</span>
          {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
}
