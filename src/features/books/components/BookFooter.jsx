import React from 'react'
import BookPart from './BookPart'

function BookFooter({ data }) {
  return (
    <>
      <div className="mt-6 px-4">
        <h2 className="font-kal-3 text-27 text-xl">درباره کتاب</h2>
        <p className="font-kal-2 text-gray-600 my-2">
          {data?.description}
        </p>
      </div>
      <div className="mt-6 px-4 mb-6">
        <h2 className="font-kal-3 text-27 text-xl mb-4"> اطلاعات کتاب</h2>
        <div className="flex mb-3">
          <p className="font-kal-2 text-gray-700 w-5/12"> تاریخ انتشار : </p>
          <p className="font-kal-2 text-gray-600 ">  {data?.publishedDate}  </p>
        </div>
        <div className="flex mb-3">
          <p className="font-kal-2 text-gray-700 w-5/12"> قیمت خرید  : </p>
          <p className="font-kal-2 text-gray-600 ">   {data?.discountPrice?.toLocaleString()} ریال </p>
        </div>
        <div className="flex mb-3">
          <p className="font-kal-2 text-gray-700 w-5/12"> تخفیف  : </p>
          <p className="font-kal-2 text-gray-600 ">  {data?.discount}  درصد</p>
        </div>
        <div className="flex mb-3">
          <p className="font-kal-2 text-gray-700 w-5/12"> وضعیت خرید  : </p>
          <p className="font-kal-2 text-gray-600 ">  {data?.hasPurchased ? 'خریداری شده' : 'خریداری نشده'}  </p>
        </div>
      </div>

      <div className="mt-8 px-4 ">
        <h2 className="font-kal-3 text-27 text-xl">  بریده های از کتاب</h2>
        <BookPart data={data?.bookPart}/>
      </div>
    </>
  )
}

export default BookFooter