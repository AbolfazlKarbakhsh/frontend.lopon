import React from 'react';
import { motion } from 'motion/react';

function OrderTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center mb-8 px-4">
      <div className="relative w-[265px] h-[44px] max-w-xs sm:max-w-sm bg-[#fe82ab] p-1 rounded-full  shadow-[2px_2px_20px_0px_rgba(254,130,171,0.5)] flex items-center">
        {/* Right Option in RTL: قابل استفاده */}
        <button
          type="button"
          onClick={() => setActiveTab('active')}
          className={`relative z-10 flex-1 py-2 text-center text-sm font-kal-3 transition-colors duration-200 cursor-pointer ${
            activeTab === 'active' ? 'text-slate-500 font-bold' : 'text-white font-bold'
          }`}
        >
          {activeTab === 'active' && (
            <motion.div
              layoutId="order-tab-pill"
              className="absolute inset-0 bg-white rounded-full shadow-xs"
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-10">قابل استفاده</span>
        </button>

        {/* Left Option in RTL: تمام شده */}
        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`relative z-10 flex-1 py-2 text-center text-sm font-kal-3 transition-colors duration-200 cursor-pointer ${
            activeTab === 'completed' ? 'text-slate-500 font-bold' : 'text-white font-bold'
          }`}
        >
          {activeTab === 'completed' && (
            <motion.div
              layoutId="order-tab-pill"
              className="absolute inset-0 bg-white rounded-full shadow-xs"
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-10">تمام شده</span>
        </button>
      </div>
    </div>
  );
}

export default OrderTabs;
