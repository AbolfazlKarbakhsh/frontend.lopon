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
    <div className="w-full max-w-md md:max-w-xl mx-auto px-4 py-3 mb-20 min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full py-2 mb-2">
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
           <svg
  width="40"
  height="40"
  viewBox="0 0 40 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect
    width="40"
    height="40"
    rx="20"
    transform="matrix(-1 0 0 1 40 0)"
    fill="#F1F5F9"
  />

  <path
    d="M10.7498 26.65C10.3398 26.65 9.99982 26.31 9.99982 25.9V20.2C9.94982 17.49 10.9598 14.93 12.8398 13.01C14.7198 11.1 17.2398 10.05 19.9498 10.05C25.4898 10.05 29.9998 14.56 29.9998 20.1V25.8C29.9998 26.21 29.6598 26.55 29.2498 26.55C28.8398 26.55 28.4998 26.21 28.4998 25.8V20.1C28.4998 15.39 24.6698 11.55 19.9498 11.55C17.6398 11.55 15.4998 12.44 13.9098 14.06C12.3098 15.69 11.4598 17.86 11.4998 20.18V25.89C11.4998 26.31 11.1698 26.65 10.7498 26.65Z"
    fill="#292D32"
  />

  <path
    d="M13.94 20.45H13.81C11.71 20.45 10 22.16 10 24.26V26.14C10 28.24 11.71 29.95 13.81 29.95H13.94C16.04 29.95 17.75 28.24 17.75 26.14V24.26C17.75 22.16 16.04 20.45 13.94 20.45Z"
    fill="#292D32"
  />

  <path
    d="M26.19 20.45H26.06C23.96 20.45 22.25 22.16 22.25 24.26V26.14C22.25 28.24 23.96 29.95 26.06 29.95H26.19C28.29 29.95 30 28.24 30 26.14V24.26C30 22.16 28.29 20.45 26.19 20.45Z"
    fill="#292D32"
  />
</svg>
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

