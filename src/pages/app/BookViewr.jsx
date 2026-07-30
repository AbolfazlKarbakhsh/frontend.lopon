import React from 'react'
import BookViewerMain from "@features/BookViewr/BookViewerMain";
import HeaderTop from '@components/global/headings/HeaderTop';
import { useParams } from 'react-router';

function BookViewr() {
  const { name } = useParams();
  return (
    <div className='bg-27'>
      <HeaderTop title={name} />
      <BookViewerMain />
    </div>
  )
}

export default BookViewr