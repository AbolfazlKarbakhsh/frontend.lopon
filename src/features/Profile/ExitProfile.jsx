import React from 'react'
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from 'react-router';
import Button from '@components/table/Button';
import { STORAGE_KEYS } from '@core/constants/storage-keys';

function ExitProfile() {
  const navigate = useNavigate();

  const exitProfile = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    navigate('/login');
  }

  return (


    <Button onClick={exitProfile} className="mt-2 bg-white flex justify-between text-red-400 p-4 h-auto rounded-xl">
      <h2 className="font-kal-2 text-sm "> خروج از حساب کاربری</h2>
      <div className="flex items-center  ">
        <MdArrowBackIosNew size={12} />
      </div>
    </Button>
  )
}

export default ExitProfile