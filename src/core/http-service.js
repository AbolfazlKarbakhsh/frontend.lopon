import axios from "axios";
import { STORAGE_KEYS } from "./constants/storage-keys";

let router;
export const setRouter = (routerInstance) => {
    router = routerInstance;
};

export const navigateTo = (path) => {
    if (router) {
        router.navigate(path);
    } else {
        console.error('Router is not initialized');
    }
};

const Base_url = import.meta.env.VITE_API_BASE_URL || "https://lopon.ir/api/v1/";

export const httpService = axios.create({
    baseURL: Base_url
})

export const httpsInterceptedService = axios.create({
    baseURL: Base_url
})

httpsInterceptedService.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            }
        }
        return config
    }, (error) => Promise.reject(error)
)

httpsInterceptedService.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error?.response?.status === 401) {
            navigateTo('/login')
        }
        return Promise.reject(error)
    }
)


