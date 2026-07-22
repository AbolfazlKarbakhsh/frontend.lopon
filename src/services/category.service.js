import { httpService } from "@core/http-service";

export const categoryService = {
  getCategories: () => httpService.get("category"),
  getCategoryById: (id) => httpService.get(`category/${id}`),
};
