import React from 'react'
import useGet from "@hooks/server/useGet";
import BookHeader from "./BookHeader";
import Book from "./Book";
import SkeletonBook from './SkeletonBook';

function ProductSec({ title, category }) {
  const { data: bookData, isLoading: loadBooks } =
    useGet({ category , limit:5}
      , 'books', `books/my_Get`);

  return (
    <>
      <BookHeader title={title} category={category}/>
      <Book bookData={bookData} />
      {(loadBooks || !bookData) && <SkeletonBook />}
    </>
  )
}

export default ProductSec