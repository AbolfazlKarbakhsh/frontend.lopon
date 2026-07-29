import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Headset, TicketPercent, ShoppingCart, CreditCard, BookOpen, ChevronDown } from 'lucide-react';

function MainButtons({ onSupportClick, onFaqClick, onExitClick }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full space-y-3.5 my-4">
      {/* Primary Action Button: سفارشات من */}
      <Link to="/orders" className="block w-full">
        <div className="w-full bg-[#ff0055] hover:bg-[#e0004c] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-md shadow-pink-500/20 active:scale-[0.99] transition-all cursor-pointer">
          <img className='w-[38px] h-[38px]' src="./images/off.png" alt="" />
          <span className="font-kal-3 font-bold text-base text-white">سفارشات من</span>
        </div>
      </Link>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3.5 w-full">
        {/* Top Right: پشتیبانی */}
        <button
          type="button"
          onClick={onSupportClick}
          className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl py-4 px-3 flex items-center justify-center gap-2.5 hover:border-slate-200 active:scale-[0.98] transition-all cursor-pointer w-full"
        >
          <Headset className="w-5 h-5 text-slate-600 shrink-0" />
          <span className="font-kal-2 text-slate-700 font-medium text-sm sm:text-base">پشتیبانی</span>
        </button>

        {/* Top Left: سوالات متداول */}
        <button
          type="button"
          onClick={onFaqClick || onSupportClick}
          className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl py-4 px-3 flex items-center justify-center gap-2.5 hover:border-slate-200 active:scale-[0.98] transition-all cursor-pointer w-full"
        >
          <svg className="w-5 h-5 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span className="font-kal-2 text-slate-700 font-medium text-sm sm:text-base">سوالات متداول</span>
        </button>

        {/* Bottom Right: درباره ما */}
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl py-4 px-3 flex items-center justify-center gap-2.5 hover:border-slate-200 active:scale-[0.98] transition-all cursor-pointer w-full"
        >
          <svg className="w-5 h-5 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span className="font-kal-2 text-slate-700 font-medium text-sm sm:text-base">درباره ما</span>
        </a>

        {/* Bottom Left: خروجی از حساب */}
        <button
          type="button"
          onClick={onExitClick}
          className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl py-4 px-3 flex items-center justify-center gap-2.5 hover:border-rose-100 active:scale-[0.98] transition-all cursor-pointer w-full"
        >
          <svg className="w-5 h-5 text-[#ff0055] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="font-kal-2 text-[#ff0055] font-medium text-sm sm:text-base">خروجی از حساب</span>
        </button>
      </div>

     
    </div>
  )
}

export default MainButtons;
