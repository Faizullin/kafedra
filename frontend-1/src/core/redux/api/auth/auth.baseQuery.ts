import {API_URL} from "@/core/http";
import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/core/redux/store.ts";
import {logout, setJwtData} from "@/core/redux/reducers/authSlice.ts";
import {IAuthResponse} from "@/core/models/response/IAuthResponse.ts";
import LangConfig from "@/localization/LangConfig.ts";
import {ConstUrls} from "@/core/constants/urls.ts";


export type TFetchBaseQueryErrorProps = FetchBaseQueryError & {
    status: number;
    data: {
        type: "validation_error" | "client_error";
        errors: Array<{
            code: "validation_error" | "non_field_errors" | "throttled";
            detail: string;
            attr?: string;
        }>,
    }
}
export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, api) => {
        const {jwt_data} = (api.getState() as RootState).auth;

        if (jwt_data?.access_token) {
            headers.set("Authorization", `Bearer ${jwt_data.access_token}`);
        }
        headers.set('Accept-Language', LangConfig.getLang());
        return headers;
    },
    credentials: 'include',
}) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    TFetchBaseQueryErrorProps
>;
export const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    TFetchBaseQueryErrorProps
> = async (args, api, extraOptions: {
    use_jwt_auth?: boolean;
}) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        let use_jwt_auth = true;
        if (extraOptions !== undefined) {
            use_jwt_auth = extraOptions?.use_jwt_auth !== undefined ? extraOptions?.use_jwt_auth : true;
        }
        if (use_jwt_auth) {
            const refreshResult = await baseQuery("/auth/token/refresh/", api, extraOptions);
            if (refreshResult.data) {
                const data = refreshResult.data as IAuthResponse;
                api.dispatch(setJwtData({
                    access_token: data.access,
                    refresh_token: data.refresh,
                    refresh_expiration: data.refresh_expiration,
                }));
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
                window.location.href = ConstUrls.login;
            }
        }
    }
    return result
};