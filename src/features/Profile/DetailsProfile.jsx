import React from 'react'
import profileImage from "@assets/images/profile.png";
import Card from '@components/UI/Card';

function DetailsProfile({data}) {
  return (
    <Card classCard="shadow-sm">
      <div className="flex  items-center">
        <div className="avatar placeholder">
          <div className="bg-[#f78639] text-white rounded-full w-20">
            <img src={profileImage} alt="پروفایل" className="wh-full" />
          </div>
        </div>
        <div className=" mr-4 space-y-1">
          <h2 className="text-base text-27 font-kal-3"> {data?.name || "بدون نام کاربری"}</h2>
          <p className="text-sm font-kal-2">{data?.mobile || "در حال بارگیری"}</p>
        </div>
      </div>
    </Card>
  )
}

export default DetailsProfile