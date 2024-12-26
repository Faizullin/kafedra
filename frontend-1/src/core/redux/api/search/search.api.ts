import {api} from "@/core/redux/api/api.ts";

interface ISearchParams {
    query: string;
}

export const searchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        search: builder.query<unknown, ISearchParams>({
            query: (args) => ({
                url: '/search/',
                method: 'GET',
                params: args,
            }),
            providesTags: ['Search'],
        }),
    }),
});