import { httpService, httpsInterceptedService } from "@core/http-service";

export const authService = {
  sendOtp: (data) => httpService.post("users/send-otp", data),
  login: (data) => httpService.post("users/login", data),
  getProfile: () => httpsInterceptedService.get("users/profile"),
};
