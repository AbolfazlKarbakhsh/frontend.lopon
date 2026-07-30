import React from 'react'
import BookCard from "@components/UI/BookCard";

function SearchBooks({ bookData }) {
  return (
    <>
      <div className=' mt-4  flex flex-wrap [&>a]:flex-row gap-3 gap-y-5  [&>a]:w-full [&>a]:relative  bookSearch relative'>
        {
          bookData?.data && bookData?.data.map((e, index) => (
            <BookCard key={e.id || e._id || index} e={e}></BookCard>
          ))
        }
        
      </div>
    </>
  )
}

export default SearchBooks