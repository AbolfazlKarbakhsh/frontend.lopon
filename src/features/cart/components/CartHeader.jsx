import React, { useState } from 'react';
import { HiChevronRight } from 'react-icons/hi2';
import { BiSupport } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import SupportDrawer from '@components/global/Drawers/SupportDrawer';

function CartHeader({ title = 'سبد خرید' }) {
  const navigate = useNavigate();
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        {/* Back Button (Top Right in RTL) */}
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 transition-colors cursor-pointer"
          aria-label="بازگشت"
        >
          <HiChevronRight size={22} />
        </button>

        {/* Title (Center) */}
        <h1 className="font-kal-3 font-bold text-slate-800 text-lg sm:text-xl text-center">
          {title}
        </h1>

        {/* Support Button (Top Left in RTL) */}
        <button
          onClick={() => setIsSupportOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100/70 hover:bg-slate-200/70 text-[#ff0055] transition-colors cursor-pointer"
          aria-label="پشتیبانی"
        >
          <BiSupport size={20} />
        </button>
      </div>

      <SupportDrawer isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
    </>
  );
}

export default CartHeader;
