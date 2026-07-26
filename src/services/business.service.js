import { httpService } from "@core/http-service";

export const businessService = {
  getBusinessById: (id) => httpService.get(`business/${id}`),
  getBusinesses: (params) => httpService.get("business", { params }),
};
