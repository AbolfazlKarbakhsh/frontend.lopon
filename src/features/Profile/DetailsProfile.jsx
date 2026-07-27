import React from 'react'
import profileImage from "@assets/images/profile.png";
import { Pencil } from 'lucide-react';

function DetailsProfile({ data, onEditClick }) {
  return (
    <div className="flex flex-col items-center justify-center my-4">
      {/* Avatar Container */}
      <div className="relative">
        {/* Pink Ring Frame */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3px] border-[#ff2a70] p-1 bg-white shadow-xs flex items-center justify-center">
          <img
            src={data?.avatar || profileImage}
            alt={data?.name || "پروفایل"}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Pencil Edit Icon Badge */}
        <button
          type="button"
          onClick={onEditClick}
          className="absolute top-0 left-0 w-7 h-7 rounded-full bg-[#f4f5f7] border-2 border-white flex items-center justify-center text-slate-600 shadow-xs hover:bg-slate-200 transition-all cursor-pointer"
          title="ویرایش پروفایل"
        >
          <Pencil className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </div>

      {/* User Name */}
      <h2 className="font-kal-3 font-bold text-slate-800 text-lg sm:text-xl mt-3 text-center">
        {data?.name || "علی علی آبادی"}
      </h2>

      {/* Mobile Number */}
      <p className="text-slate-400 font-kal-2 text-sm mt-0.5 text-center dir-ltr">
        {data?.mobile || "۰۹۳۸۱۷۷۸۹۲۰"}
      </p>
    </div>
  )
}

export default DetailsProfile;
