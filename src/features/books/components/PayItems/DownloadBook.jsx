import React from 'react'
import { useEffect } from "react"
import useFileDownloader from "@hooks/viewerBook/useFileDownloader"
import useIndexDb from "@hooks/viewerBook/useIndexDb"
import { Link } from 'react-router-dom'

function DownloadBook({ data }) {
  const { id, pdfUrl , title , price , imageUrl		} = data;
  // index db
  const { addbookFile, hasFile, isChecked } = useIndexDb(id);

  // get file Book As Server
  const [getBookServer, bookFile, bookFileLoading] = useFileDownloader({}, pdfUrl, `${id}_File`, id)
  const getBook = async () => await getBookServer(pdfUrl)

  // Add book to IndexedDB when downloaded
  useEffect(() => {
    if (bookFile && bookFile.data) {
      addbookFile(bookFile.data , title , imageUrl , price)
    }
  }, [bookFile])

  return (
    <div className="flex justify-around w-full">
      {isChecked &&
        (hasFile ? (
          <Link to={`/books/BookViewer/${id}/${title}`}>
            <button className="btn btn-wide bg-firoze border-0 text-white " onClick={getBook} disabled={bookFileLoading}>
              <span className="font-kal-2">  مطالعه کتاب </span>
            </button>
          </Link>
        ) : (
          <>
            <button className="btn btn-wide bg-firoze border-0 text-white " onClick={getBook} disabled={bookFileLoading}>
              <span className="font-kal-2">      {bookFileLoading ? "در حال دانلود..." : "دریافت کتاب"} </span>
            </button>
          </>
        ))}
    </div>
  )

}

export default DownloadBook