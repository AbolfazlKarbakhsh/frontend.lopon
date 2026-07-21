import { MdArrowBackIosNew } from "react-icons/md"; 
import { MdKeyboardArrowLeft } from "react-icons/md"; 
import React from 'react'
import { Link } from "react-router-dom";

function BookHeader({title , category}) {
  return (
    <div className="flex justify-between px-4 my-6">
      <h2 className="text-27 font-kal-3 text-lg "> {title}</h2>
        <div className='flex items-center text-firoze '>
            <Link to={`/categorypage/${category}`} className="ml-2 font-kal-2 text-[.8rem] cursor-pointer">مشاهده همه</Link>
            <MdArrowBackIosNew size={12} />
            {/* <MdKeyboardArrowLeft /> */}
        </div>
    </div>
  )
}

export default BookHeader