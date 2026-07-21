import { useEffect } from "react"
import BookHeader from "./components/BookHeader"
import PayBook from "./components/PayBook"
import BookFooter from "./components/BookFooter"
import BookSkeleton from "./components/BookSkeleton"
import useGet from "@hooks/server/useGet"
import { useParams } from "react-router"
import AppState from "@components/UI/AppState"
import HeaderTop from '@components/global/headings/HeaderTop';

function BookMain() {
  const { bookId } = useParams()

  const {
    data: bookData,
    isLoading: loadBooks,
    isError: errBook,
    refetch: refetchBook,
  } = useGet({}, `books/${bookId}`, `books/onBook_Get_${bookId}`)



  return (
    <div>
      {bookData && !loadBooks && !errBook && (
        <>
          <HeaderTop title="" className="bg-firoze border-b-0 shadow-none relative [svg]:fill-" classPage="  bg-firoze hidden" />
          <div className="w-full h-52 bg-gradient-to-b from-firoze to-cyan-200 "></div>
          <BookHeader data={bookData?.data} />
          <PayBook data={bookData?.data} />
          <BookFooter data={bookData?.data} />
        </>
      )}

      {loadBooks && <>
        <HeaderTop title="" className="bg-firoze border-b-0 shadow-none relative [svg]:fill-" classPage="  bg-firoze hidden" />
        <BookSkeleton />
      </>}

      {!bookData?.data && !loadBooks && <AppState state="in" className="mt-[15vh]" callBack={refetchBook} />}
    </div>
  )
}

export default BookMain

