import { useState, useEffect } from "react"
import { initDB, useIndexedDB } from "react-indexed-db-hook"

const DBConfig = {
  name: "bookSp",
  version: 3,
  objectStoresMeta: [
    {
      store: "books",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "title", keypath: "title", options: { unique: false } },
        { name: "imageUrl", keypath: "imageUrl", options: { unique: false } },
        { name: "price", keypath: "price", options: { unique: false } },
        { name: "file", keypath: "file", options: { unique: false } },
      ],
    },
  ],
}

const useIndexDb = (id , listData) => {
  // initialise db
  try {
    initDB(DBConfig)
  } catch (error) {
    // Silent catch for already initialized DB
  }

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
        console.log("Error adding book:", error)
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

