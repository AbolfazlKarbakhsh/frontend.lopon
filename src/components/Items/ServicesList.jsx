import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { formatPrice } from '@utils/formatters';

export default function ServicesList({
  services,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenTermsModal,
}) {
  const [showOtherServices, setShowOtherServices] = useState(false);

  // Default: display 4 services initially, expand to 8 (or all) services when clicked
  const displayedServices = showOtherServices ? services.slice(0, 8) : services.slice(0, 4);
  const hasMoreServices = services.length > 4;

  return (
    <div className="relative mx-4 mt-6 z-20 filter drop-shadow-[0_12px_24px_rgba(15,23,42,0.12)]">
      <div
        className="bg-white rounded-[16px] border border-slate-100/80 p-4 pt-4 px-4"
        style={{
          WebkitMaskImage: `
            radial-gradient(circle 9px at 0px 52px, transparent 8.5px, black 9px),
            radial-gradient(circle 9px at 100% 52px, transparent 8.5px, black 9px)
          `,
          maskImage: `
            radial-gradient(circle 9px at 0px 52px, transparent 8.5px, black 9px),
            radial-gradient(circle 9px at 100% 52px, transparent 8.5px, black 9px)
          `,
          WebkitMaskComposite: 'destination-in',
          maskComposite: 'intersect',
        }}
      >
        {/* Services Header: 'خدمات:' on Right, 'شرایط استفاده' on Left */}
        <div className="flex justify-between items-center h-[36px] px-1 mb-2">
          {/* Right side (RTL first child): Title 17px normal */}
          <h2 className="text-[17px] font-normal text-slate-800 tracking-tight">
            خدمات:
          </h2>

          {/* Left side (RTL second child): Terms trigger with ChevronLeft on the left */}
          <button
            id="terms-conditions-btn"
            type="button"
            onClick={onOpenTermsModal}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 font-normal cursor-pointer transition-colors"
          >
            <span>شرایط استفاده</span>
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Punch Card Top Divider - Passes exactly through the punch notches center at 52px */}
        <div className="w-full px-1 mb-4 h-[1px] flex items-center">
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

        {/* Services List */}
        <div className="space-y-3">
          {displayedServices.map((service, index) => {
            const qty = cart[service.id] || 0;
            return (
              <div key={service.id} className="text-right">
                <div className="flex items-center justify-between py-1.5">
                  {/* Right side: Product Name 15px normal gray */}
                  <div className="flex-1 text-right pl-2">
                    <h3 className="text-[15px] font-normal text-slate-600 leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  {/* Left side: Prices & Add Button container */}
                  <div className="flex items-center gap-3">
                    {/* Prices box (positioned to the right of the button) */}
                    <div className="flex flex-col items-end justify-center text-left leading-tight">
                      {/* Original Price (strikethrough top-right to bottom-left) */}
                      {service.originalPrice && (
                        <div className="relative inline-block text-[11px] font-[500] text-slate-500 leading-tight">
                          <span>{formatPrice(service.originalPrice)}</span>
                          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none">
                            <line x1="100%" y1="0%" x2="0%" y2="100%" stroke="#64748b" strokeWidth="1.2" />
                          </svg>
                        </div>
                      )}
                      {/* Discounted / Main Price 15px weight 600 */}
                      <span className="text-[15px] font-[600] text-slate-800 leading-tight">
                        {formatPrice(service.discountedPrice)}
                      </span>
                    </div>

                    {/* Button: width 68px, height 36px, radius 8px, font normal */}
                    <div>
                      {qty > 0 ? (
                        <div className="flex items-center justify-between w-[68px] h-[36px] bg-rose-50 border border-rose-200 rounded-[8px] px-1">
                          <button
                            id={`inc-${service.id}`}
                            type="button"
                            onClick={() => onAddToCart(service.id)}
                            className="w-5 h-5 flex items-center justify-center bg-[#ff0054] text-white rounded-md text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800">
                            {qty}
                          </span>
                          <button
                            id={`dec-${service.id}`}
                            type="button"
                            onClick={() => onRemoveFromCart(service.id)}
                            className="w-5 h-5 flex items-center justify-center bg-slate-200 text-slate-700 rounded-md text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          id={`add-btn-${service.id}`}
                          type="button"
                          onClick={() => onAddToCart(service.id)}
                          className="w-[68px] h-[36px] bg-[#ff0054] hover:bg-[#e0004a] text-white text-xs font-normal rounded-[8px] transition-colors cursor-pointer flex items-center justify-center"
                        >
                          افزودن
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Item separator line (except last if not expanded) */}
                {index < displayedServices.length - 1 && (
                  <div className="w-full px-1 my-3 h-[1px] flex items-center">
                    <svg className="w-full h-[2px] overflow-visible" preserveAspectRatio="none">
                      <line
                        x1="0"
                        y1="1"
                        x2="100%"
                        y2="1"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="12 8"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Expandable "Other Services" button */}
        {hasMoreServices && (
          <div className="pt-4 pb-1">
            <motion.button
              whileTap={{ scale: 0.98 }}
              id="toggle-services-btn"
              type="button"
              onClick={() => setShowOtherServices(!showOtherServices)}
              className="w-full py-2.5 border border-slate-600 rounded-[8px] text-sm font-normal text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{showOtherServices ? 'بستن سایر خدمات' : 'سایر خدمات'}</span>
              {showOtherServices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}


