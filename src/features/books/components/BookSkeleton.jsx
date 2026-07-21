import React from 'react'

function BookSkeleton() {
  return (
    <div>
      <div className="w-full h-52 bg-gradient-to-b from-firoze to-cyan-200 "></div>
      <div className="flex-center -mt-[12.4rem] mb-2">
        <div className="skeleton   max-w-[260px] min-w-[210px]   rounded-lg max-h-[280px] h-[280px]"></div>
      </div>
      <div className="flex-center flex-col px-8 border-b-2 border-gray-200 pb-6">
        <div className="skeleton   w-[90px]   rounded-lg  h-[15px] my-8"></div>
        <div className="skeleton     rounded-lg  h-[8px] btn  w-[190px]"></div>
      </div>
        <div className="my-6 px-4">
          <div className="my-4 skeleton   w-[90px]   rounded-lg  h-[15px]"></div>
          <div className="my-3 skeleton   w-[100%]   rounded-lg  h-[10px]"></div>
          <div className="my-3 skeleton   w-[100%]   rounded-lg  h-[10px]"></div>
          <div className="my-3 skeleton   w-[100%]   rounded-lg  h-[10px]"></div>
          <div className="my-3 skeleton   w-[100%]   rounded-lg  h-[10px]"></div>
        </div>
    </div>
  )
}

export default BookSkeleton