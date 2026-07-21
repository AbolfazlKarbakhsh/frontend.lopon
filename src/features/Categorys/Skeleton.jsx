import React from 'react'

function Skeleton() {
  return (
    < >
      <div className="flex flex-wrap justify-around gap-3 mt-4 ">
        <div className="skeleton h-24  w-[48%]   rounded-lg"></div>
        <div className="skeleton h-24  w-[48%]   rounded-lg"></div>
        <div className="skeleton h-24  w-[48%]   rounded-lg"></div>
        <div className="skeleton h-24  w-[48%]   rounded-lg"></div>
        <div className="skeleton h-24  w-[48%]   rounded-lg"></div>
        <div className="skeleton h-24  w-[48%]   rounded-lg"></div>
      </div>

    </>
  )
}

export default Skeleton