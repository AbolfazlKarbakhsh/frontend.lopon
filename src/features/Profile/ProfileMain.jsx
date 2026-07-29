import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailsProfile from "./DetailsProfile";
import MainButtons from "./MainButtons";
import Skeleton from "./components/Skeleton";
import PageHeader from "@components/global/headings/PageHeader";
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
      <PageHeader title="حساب کاربری" />

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

