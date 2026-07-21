import React from 'react'
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from 'react-router';
import Button from '@components/table/Button';

function ExitProfile() {
  const navigate = useNavigate();

  const exitProfile = () => {
    localStorage.setItem('t_sa!@!##@$df', '');
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