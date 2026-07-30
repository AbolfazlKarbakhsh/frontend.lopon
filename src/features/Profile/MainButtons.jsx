import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Headset } from 'lucide-react';

function MainButtons({ onSupportClick, onFaqClick, onExitClick }) {
  return (
    <div className="w-full space-y-3.5 my-4">
      {/* Primary Action Button: سفارشات من */}
      <Link to="/orders" className="block w-full">
        <motion.div
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#ff2d55] hover:bg-[#e02547] text-white py-3 px-5 rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_4px_15px_rgba(255,45,85,0.18)] transition-all cursor-pointer"
        >
          <img className="w-[32px] h-[32px] object-contain" src="./images/off.png" alt="off" />
          <span className="font-kal-3 font-bold text-sm sm:text-base text-white">سفارشات من</span>
        </motion.div>
      </Link>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3.5 w-full">
        {/* Top Right: پشتیبانی */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onSupportClick}
          className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl py-4 px-3 flex items-center justify-center gap-2.5 hover:border-rose-100 transition-all cursor-pointer w-full"
        >
          <Headset className="w-5 h-5 text-slate-600 shrink-0" />
          <span className="font-kal-2 text-slate-700 font-medium text-sm sm:text-base">پشتیبانی</span>
        </motion.button>

        {/* Top Left: سوالات متداول */}
        <Link to="/faq" className="block w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl py-4 px-3 flex items-center justify-center gap-2.5 hover:border-rose-100 transition-all cursor-pointer w-full"
          >
            <svg className="w-5 h-5 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span className="font-kal-2 text-slate-700 font-medium text-sm sm:text-base">سوالات متداول</span>
          </motion.div>
        </Link>

        {/* Bottom Right: درباره ما */}
        <Link to="/about-us" className="block w-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl py-4 px-3 flex items-center justify-center gap-2.5 hover:border-rose-100 transition-all cursor-pointer w-full"
          >
            <svg className="w-5 h-5 text-slate-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span className="font-kal-2 text-slate-700 font-medium text-sm sm:text-base">درباره ما</span>
          </motion.div>
        </Link>

        {/* Bottom Left: خروجی از حساب */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onExitClick}
          className="bg-white border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-2xl py-4 px-3 flex items-center justify-center gap-2.5 hover:border-rose-200 hover:bg-rose-50/20 transition-all cursor-pointer w-full"
        >
          <svg className="w-5 h-5 text-[#ff2d55] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="font-kal-2 text-[#ff2d55] font-medium text-sm sm:text-base">خروجی از حساب</span>
        </motion.button>
      </div>
    </div>
  );
}

export default MainButtons;

