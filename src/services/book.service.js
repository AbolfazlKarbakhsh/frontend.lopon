import { httpService, httpsInterceptedService } from "@core/http-service";

export const bookService = {
  getBooks: (params) => httpService.get("books", { params }),
  getBookById: (id) => httpService.get(`books/${id}`),
  getCategoryBooks: (catId) => httpService.get(`books/category/${catId}`),
  downloadBook: (id) => httpsInterceptedService.get(`books/download/${id}`),
  getMyLibrary: () => httpsInterceptedService.get("users/books"),
};
