import { httpsInterceptedService } from "@core/http-service";

export const userService = {
  getProfile: () => httpsInterceptedService.get("users/profile"),
  updateProfile: (data) => httpsInterceptedService.put("users/profile", data),
  getUserBooks: () => httpsInterceptedService.get("users/books"),
  getUserPayments: () => httpsInterceptedService.get("users/payments"),
};
