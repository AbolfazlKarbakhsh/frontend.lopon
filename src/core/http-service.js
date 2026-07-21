import axios from "axios";

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

const Base_url = "https://sa-app.ir/api/v1/"
const Base_url_Api = "https://sa-app.ir/api/v1/"
// const Base_url = "http://localhost:3000/api/v1/"
// const Base_url_Api = "http://localhost:3000/api/v1/"

export const httpService = axios.create({
    baseURL: Base_url
})

export const httpsInterceptedService = axios.create({
    baseURL: Base_url_Api
})

httpsInterceptedService.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('t_sa!@!##@$df')
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
        if (error.response.status === 401) {
            navigateTo('/login')
        }
        return Promise.reject(error)
    }
)

