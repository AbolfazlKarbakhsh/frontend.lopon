import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";


function CategoryBox({className , size = 30 ,data , classImage}) {
  return (
    <Link to={`/categorypage/${data?.id}`} className={twMerge('flex flex-col justify-center bg-white items-center space-y-2  py-4 rounded-md cursor-pointer', className)}>
      <img src={data?.imageUrl} className={twMerge("img-fluid w-[30px] h-[30px]" , classImage)} size={size}/>
      <p className="text-27 font-kal-2 text-sm">{data?.title}</p>
    </Link>
  );
}

export default CategoryBox;

