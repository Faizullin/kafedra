import {api} from "@/core/redux/api/api.ts";
import {IAuthResponse} from "@/core/models/response/IAuthResponse.ts";
import {IAuthUser} from "@/core/models/IAuthUser.ts";
import {setAuthUser, setJwtData} from "@/core/redux/reducers/authSlice.ts";


export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/auth/login/token/',
                method: 'POST',
                body: credentials,
            }),
            extraOptions: {
                use_jwt_auth: false,
            },
            async onQueryStarted(_args, {dispatch, queryFulfilled}) {
                try {
                    const response = await queryFulfilled;
                    dispatch(setJwtData({
                        access_token: response.data.access,
                        refresh_token: response.data.refresh,
                        refresh_expiration: response.data.refresh_expiration,
                    }));
                    await dispatch(authApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    // return {error}
                }
            },
        }),
        register: builder.mutation<IAuthResponse, Record<string, string>>({
            query: (values) => ({
                url: '/auth/register/',
                method: 'POST',
                body: values,
            }),
            extraOptions: {
                use_jwt_auth: false,
            },
        }),
        logout: builder.mutation<unknown, Record<string, string>>({
            query: (values) => ({
                url: '/auth/logout/',
                method: 'POST',
                body: values,
            }),
        }),
        passwordReset: builder.mutation<unknown, unknown>({
            query: (values) => ({
                url: '/auth/password/reset/',
                method: 'POST',
                body: values,
            }),
            extraOptions: {
                use_jwt_auth: false,
            },
        }),
        passwordResetConfirm: builder.mutation<unknown, unknown>({
            query: (values) => ({
                url: '/auth/password/reset/confirm/',
                method: 'POST',
                body: values,
            }),
            extraOptions: {
                use_jwt_auth: false,
            },
        }),
        verifyEmail: builder.mutation<unknown, unknown>({
            query: (values) => ({
                url: '/auth/verify-email/',
                method: 'POST',
                body: values,
            }),
            extraOptions: {
                use_jwt_auth: false,
            },
        }),
        getMe: builder.query<IAuthUser, null>({
            query() {
                return {
                    url: '/auth/me/',
                    credentials: 'include',
                };
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            async onQueryStarted(_args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setAuthUser(data));
                } catch (error) {
                    return {error}
                }
            },
        }),
    })
})
