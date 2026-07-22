import { initDB, useIndexedDB } from "react-indexed-db-hook";

export const PDF_DB_CONFIG = {
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
};

let isDbInitialized = false;

export const initPdfStorage = () => {
  if (isDbInitialized) return;
  try {
    initDB(PDF_DB_CONFIG);
    isDbInitialized = true;
  } catch (error) {
    console.warn("IndexedDB initialization warning:", error);
  }
};

export class PdfStorageService {
  static handleStorageError(error) {
    if (error?.name === "QuotaExceededError" || error?.code === 22) {
      console.error("خطای تکمیل ظرفیت حافظه مرورگر! متأسفانه حافظه ذخیره‌سازی محلی پر شده است.");
      throw new Error("تکمیل ظرفیت حافظه مرورگر");
    }
    console.error("خطای پایگاه داده محلی:", error);
    throw error;
  }
}
