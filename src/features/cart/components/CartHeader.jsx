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
      <div className="h-[58.9px]" />
      <div className="fixed top-0 left-0 right-0 w-full z-20 h-[58.9px] border-b border-gray-100 bg-white shadow-xs px-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
          aria-label="بازگشت"
        >
          <HiChevronRight size={24} />
        </button>

        <h1 className="font-kal-3 font-bold text-gray-900 text-base">{title}</h1>

        <button
          onClick={() => setIsSupportOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-[#ff0055] transition-colors cursor-pointer"
          aria-label="پشتیبانی"
        >
          <BiSupport size={22} />
        </button>
      </div>

      <SupportDrawer isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
    </>
  );
}

export default CartHeader;
