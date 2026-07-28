import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Headset, User, ChevronRight } from "lucide-react";
import DetailsProfile from "./DetailsProfile";
import MainButtons from "./MainButtons";
import Skeleton from "./components/Skeleton";
import SupportDrawer from "@components/global/Drawers/SupportDrawer";
import useGet from "@hooks/server/useGet";
import { STORAGE_KEYS } from "@core/constants/storage-keys";

const ProfileMain = () => {
  const navigate = useNavigate();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { data: getME, isLoading } = useGet({}, 'users/getMe', `users/getMe_Get`);

  const handleExitProfile = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md md:max-w-xl mx-auto px-3 py-[8px] mb-20 min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full py-[12px] px-[16px] mb-2">
        {/* Left Side: User & Headset Icons */}
        
         <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
          aria-label="بازگشت"
        >
          <ChevronRight className="w-6 h-6 text-slate-700" />
        </button>

        

        {/* Center Title */}
        <h1 className="font-kal-3 font-bold text-slate-800 text-lg sm:text-xl">
          حساب کاربری
        </h1>

        {/* Right Side: Back Chevron Button */}
        <div className="flex items-center gap-2 ">
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
            onClick={() => {}}
            className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
            aria-label="حساب کاربر"
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

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex-1 flex flex-col justify-start">
          {/* User Details (Avatar Ring, Pencil Badge, Name, Mobile) */}
          <DetailsProfile
            data={getME?.data}
            onEditClick={() => {}}
          />

          {/* Main Action Button (سفارشات من) & 2x2 Grid */}
          <MainButtons
            onSupportClick={() => setIsSupportOpen(true)}
            onFaqClick={() => setIsSupportOpen(true)}
            onExitClick={handleExitProfile}
          />
        </div>
      )}

      {/* Support Drawer Modal */}
      <SupportDrawer isOpen={isSupportOpen} setIsOpen={setIsSupportOpen} />
    </div>
  );
};

export default ProfileMain;

