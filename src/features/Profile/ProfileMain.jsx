import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DetailsProfile from "./DetailsProfile";
import MainButtons from "./MainButtons";
import Skeleton from "./components/Skeleton";
import EditProfileModal from "./EditProfileModal";
import SupportDrawer from "@components/global/Drawers/SupportDrawer";
import useGet from "@hooks/server/useGet";
import { STORAGE_KEYS } from "@core/constants/storage-keys";

const ProfileMain = () => {
  const navigate = useNavigate();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: getME, isLoading } = useGet({}, 'users/getMe', `users/getMe_Get`);

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('lopon_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore error
      }
    }
    return { name: "سارا احمدی", mobile: "۰۹۳۸۱۷۷۸۹۲۰" };
  });

  useEffect(() => {
    if (getME?.data?.name || getME?.data?.mobile) {
      setProfileData((prev) => ({
        ...prev,
        name: getME.data.name || prev.name,
        mobile: getME.data.mobile || prev.mobile,
      }));
    }
  }, [getME]);

  const handleSaveProfile = (updated) => {
    const merged = { ...profileData, ...updated };
    setProfileData(merged);
    localStorage.setItem('lopon_user_profile', JSON.stringify(merged));
  };

  const handleExitProfile = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md md:max-w-xl mx-auto px-3 py-2 flex flex-col">

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex-1 flex flex-col justify-start">
          {/* User Details (Avatar Ring, Pencil Badge, Name, Mobile) */}
          <DetailsProfile
            data={profileData}
            onEditClick={() => setIsEditOpen(true)}
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

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={profileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfileMain;


