import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SupportDrawer from '@components/global/Drawers/SupportDrawer';
import { LuUser } from 'react-icons/lu';
import { BiSupport } from 'react-icons/bi';

function PageHeader({ title, onBack, showProfileIcon = true, showSupportIcon = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const isProfilePage = location.pathname === '/profile';

  return (
    <>
      <div className="flex items-center justify-between w-full py-3 px-4 mb-2 bg-white">
        {/* Right Side in RTL: Back Chevron Button */}
        <button
          type="button"
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
          aria-label="بازگشت"
        >
          <img src="/svg/iconback.svg" alt="بازگشت" />
        </button>

        {/* Center Title */}
        <h1 className="font-kal-3 font-bold text-slate-800 text-lg sm:text-xl text-center">
          {title}
        </h1>

        {/* Left Side in RTL: Support & User Profile Icons */}
        <div className="flex items-center gap-2">
          {showSupportIcon && (
            <button
              type="button"
              onClick={() => setIsSupportOpen(true)}
              className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              aria-label="پشتیبانی"
            >
                          <BiSupport size={20} />
              
              
            </button>
          )}

          {showProfileIcon && (
            <button
            type="button"
            onClick={() => {
              if (!isProfilePage) {
                navigate('/profile');
              }
            }}
            className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
            aria-label="حساب کاربری"
            >
                          <LuUser size={20} />
              
            

            </button>
          )}
        </div>
      </div>

      <SupportDrawer isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
    </>
  );
}

export default PageHeader;
