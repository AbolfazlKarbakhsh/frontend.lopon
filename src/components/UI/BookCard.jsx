import React from 'react'
import { Link } from 'react-router-dom'
function BookCard({ e }) {
  const priceState = (price) => {
    if (price?.discountPrice == "0") {
      return "رایگان";
    }
    return price?.discountPrice?.toLocaleString();
  }
  return (
    <Link className="card bg-white" to={`/books/${e?._id}`}>
      <figure className="p-3 bg-[#61646b1d] h-[210px]">
        <img
          src={e?.imageUrl}
          alt={e?.title}
          className="rounded-xl  z-10 h-auto max-h-[180px]"
        />
      </figure>
      <div className="px-3 py-4">
        <p className="text-27 text-[.71rem]  h-[35px] truncate whitespace-normal tracking-wider font-kal-3 "> {e.title}  </p>
      </div>
      <div className=" px-3 priceStage">
        <hr />
        <div className="py-2 flex justify-end items-center text-27">
          <span className="text-sm font-kal-2">{priceState(e)}</span>
          {priceState(e) != "رایگان" && <span className="mr-1 text-gray-500 text-xs font-kal-2">ریال</span>}
        </div>
      </div>
    </Link>
  )
}

export default BookCard