import React from 'react'
import sa from "@assets/images/Sa.svg";
import { CiSearch } from "react-icons/ci";

function HeaderSearchInput() {
  return (
    <div className=" border-b fixed top-0 bg-white w-full shadow-sm">
    <div className="m-2">
      <div
        className="bg-s-gray border border-b-gray h-15 w-full py-2 px-2 rounded-lg
     flex items-center"
      >
        <CiSearch size={24} className="text-gray-500 " />
        <span className="text-gray-500 text-sm font-kal-2 mr-1">
          جستجو در{" "}
        </span>
        <img src={sa} alt="" className="h-6 object-contain w-32 mr-1 " />
      </div>
    </div>
  </div>
  )
}

export default HeaderSearchInput