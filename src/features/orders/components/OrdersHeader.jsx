import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headset, User, ChevronRight } from 'lucide-react';
import SupportDrawer from '@components/global/Drawers/SupportDrawer';

function OrdersHeader({ title = 'سفارشات من' }) {
  const navigate = useNavigate();
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between w-full py-3 px-4 mb-2 bg-white">
        {/* Right Side in RTL: Back Chevron Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
          aria-label="بازگشت"
        >
          <img src="/svg/iconback.svg" alt="" />
        </button>

        {/* Center Title */}
        <h1 className="font-kal-3 font-bold text-slate-800 text-lg sm:text-xl">
          {title}
        </h1>

        {/* Left Side in RTL: User & Headset Icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSupportOpen(true)}
            className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
            aria-label="پشتیبانی"
          >
              <img src="/public/svg/suport.svg" alt="پشتیبانی " />
          </button>
          <button
  type="button"
  onClick={() => navigate('/profile')}
  className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
  aria-label="حساب کاربری"
>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>
        </div>
      </div>

      <SupportDrawer isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
    </>
  );
}

export default OrdersHeader;
