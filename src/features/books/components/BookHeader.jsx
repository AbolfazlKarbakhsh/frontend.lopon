import React from 'react'

function BookHeader({data}) {
  return (
    <div className="flex-center -mt-[12.4rem] mb-2">
      <img src={data?.imageUrl} alt="" className="max-h-[280px] h-[280px]" />
    </div>
  )
}

export default BookHeader