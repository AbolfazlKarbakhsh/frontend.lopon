import React from 'react'

function Skeleton() {
  return (
    < >
      <div className="flex w-100 flex-col gap-4 mt-2">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className='flex gap-2'>
          <div className="skeleton h-[4.5rem]  w-1/2 rounded-lg"></div>
          <div className="skeleton h-[4.5rem]  w-1/2 rounded-lg"></div>
        </div>
        <div className='flex gap-2'>
          <div className="skeleton h-[4.5rem]  w-1/3 rounded-lg"></div>
          <div className="skeleton h-[4.5rem]  w-1/3 rounded-lg"></div>
          <div className="skeleton h-[4.5rem]  w-1/3 rounded-lg"></div>
        </div>
        <div className="skeleton h-12 -mt-1  w-100  rounded-lg"></div>
      </div>
    </>
  )
}

export default Skeleton