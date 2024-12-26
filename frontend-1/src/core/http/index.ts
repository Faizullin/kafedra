export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const API_URL = BASE_URL + '/api/v1';

// const $api = axios.create({
//     withCredentials: true,
//     baseURL: API_URL,
// });
//
// $api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     const token = AuthStorageService.getCurrentAccessToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     config.headers['Accept-Language'] = LangConfig.getLang();
//     return config;
// });
// $api.interceptors.response.use(
//     (config: AxiosResponse) => {
//         return config;
//     },
//     async (error) => {
//         if (axios.isAxiosError(error)) {
//             const originalRequest = error.config;
//             if (originalRequest === undefined || originalRequest.url === undefined) {
//                 throw new Error("originalRequest is undefined ")
//             }
//             if (error.response) {
//                 if (
//                     error.code === "user_not_found" ||
//                     error.response.data.code === "user_not_found"
//                 ) {
//                     AuthStorageService.clean();
//                     window.location.reload();
//                 } else if (
//                     error.code === "ECONNABORTED " ||
//                     error.message === "Network Error"
//                 ) {
//                     // Timeout or network error (ERR_CONNECTION_REFUSED)
//                     // alert("Internet connection error. Please check your connection.");
//                 } else if (
//                     error.code === "ERR_CANCELED" ||
//                     error.message === "canceled"
//                 ) {
//                 } else if (error.response.status === 401) {
//                     try {
//                         const data = AuthStorageService.getStorageData();
//                         if (
//                             data.access_token &&
//                             !originalRequest!.url!.startsWith("/login")
//                         ) {
//                             if (data.refresh_token) {
//                                 const response = await axios.post<IAuthResponse>(
//                                     `${API_URL}/token/refresh/`,
//                                     {
//                                         refresh: data.refresh_token,
//                                     }
//                                 );
//                                 AuthStorageService.setStorageData({
//                                     access_token: response.data.access,
//                                 });
//                                 return $api.request(originalRequest);
//                             }
//                             AuthStorageService.clean();
//                         } else {
//                             AuthStorageService.clean();
//                         }
//                     } catch (e) {
//                         AuthStorageService.clean();
//                         window.location.reload();
//                     }
//                 }
//             }
//         }
//         return Promise.reject(error);
//     }
// );
//
// export default $api;
