import { useState, useEffect } from "react"
import { useIndexedDB } from "react-indexed-db-hook"
import { initPdfStorage, PdfStorageService } from "../../lib/pdf-storage"

const useIndexDb = (id , listData) => {
  // initialise db via isolated service
  initPdfStorage()

  // states
  const [hasFile, setHasFile] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [dataList, setBookList] = useState();

  // methods call
  const { add, getByIndex, getAll } = useIndexedDB("books")

  // Check file on mount
  useEffect(() => {
    if (id) {
      checkFile()
    }
  }, [id])

  // methods use
  const checkFile = () => {
    getByIndex("name", id).then(
      (matchingBook) => {
        setHasFile(matchingBook)
        setIsChecked(true)
      },
      (error) => {
        console.log("Error checking file:", error)
        setIsChecked(true)
      },
    )
  }

  const addbookFile = (file, title, imageUrl, price) => {
    add({ name: id, file, title, imageUrl, price }).then(
      () => {
        checkFile()
      },
      (error) => {
        PdfStorageService.handleStorageError(error);
      },
    )
  }

  const getList = () => {
    getAll().then(
      (matchingBooks) => {
        setBookList(matchingBooks);
      },
      (error) => {
        console.log("Error getting all books:", error)
      },
    )
  }

  useEffect(() => {
    if (listData) {
      getList()
    }
  }, [listData])

  return { addbookFile, checkFile, hasFile, isChecked, getList, dataList }
}

export default useIndexDb

