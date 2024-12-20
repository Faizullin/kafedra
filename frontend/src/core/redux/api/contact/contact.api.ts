import {api} from "@/core/redux/api/api.ts";

export const contactApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendContactForm: builder.mutation({
            query: (contactData) => ({
                url: '/contact_us/submit/',
                method: 'POST',
                body: contactData,
            }),
        }),
    }),
})