export const queryKeys = {
  auth: {
    all: ['auth'],
    profile: () => [...queryKeys.auth.all, 'profile'],
  },
  books: {
    all: ['books'],
    lists: () => [...queryKeys.books.all, 'list'],
    detail: (id) => [...queryKeys.books.all, 'detail', id],
    myLibrary: () => [...queryKeys.books.all, 'my-library'],
    category: (catId) => [...queryKeys.books.all, 'category', catId],
  },
  categories: {
    all: ['categories'],
    lists: () => [...queryKeys.categories.all, 'list'],
    detail: (id) => [...queryKeys.categories.all, 'detail', id],
  },
  business: {
    all: ['business'],
    lists: () => [...queryKeys.business.all, 'list'],
    detail: (id) => [...queryKeys.business.all, 'detail', id],
  },
  payments: {
    all: ['payments'],
    lists: () => [...queryKeys.payments.all, 'list'],
  },
  user: {
    all: ['user'],
    profile: () => [...queryKeys.user.all, 'profile'],
    books: () => [...queryKeys.user.all, 'books'],
    payments: () => [...queryKeys.user.all, 'payments'],
  }
};
