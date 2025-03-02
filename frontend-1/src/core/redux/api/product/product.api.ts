import {IDataResponse} from "@/core/models/response/IDataResponse.ts";
import {IProduct} from "@/core/models/IProduct.ts";
import {api} from "@/core/redux/api/api.ts";
import {IProductFilters, IProductListParams} from "@/core/redux/api/product/product.types.ts";
import {RootState} from "@/core/redux/store.ts";
import {BaseQueryApi} from "@reduxjs/toolkit/query";

export const productApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductList: builder.query<IDataResponse<IProduct>, IProductListParams | undefined>({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            queryFn: async (args, api: BaseQueryApi, _, baseQuery) => {
                const state = api.getState() as RootState;
                const {filters: appliedFilters, pagination} = state.filter.filters.product_list;
                let new_data: Record<string, unknown> = {
                    ...pagination,
                }
                if (appliedFilters.category_list!.data.length > 0) {
                    new_data.categories = appliedFilters.category_list!.data.map(item => item.id)
                }
                if (appliedFilters.brand_list!.data.length > 0) {
                    new_data.brands = appliedFilters.brand_list!.data.map(item => item.id)
                }
                if (appliedFilters.search!.data) {
                    new_data.search = appliedFilters.search!.data
                }
                if (appliedFilters.price!.data?.from && appliedFilters.price!.data?.from) {
                    new_data.price_min = appliedFilters.price!.data.from
                    new_data.price_max = appliedFilters.price!.data.to
                }
                if (appliedFilters.discount__gte!.data) {
                    new_data.offer__discount_min = appliedFilters.discount__gte!.data
                }
                if (args !== undefined) {
                    new_data = {
                        ...new_data,
                        ...args,
                    }
                }
                try {
                    const {data} = await baseQuery({
                        url: `/products`,
                        method: 'GET',
                        params: new_data,
                    });
                    const results = (data as IDataResponse<IProduct>).results.map(item => ({
                        ...item,
                        base_price: Number(item.base_price),
                        price_of_offer: Number(item.price_of_offer),
                    }))
                    return {
                        data: {
                            results,
                            count: (data as IDataResponse<IProduct>).count,
                        }
                    }
                } catch (error) {
                    return {error}
                }
            },
            providesTags: ['Product'],
        }),
        getProduct: builder.query<IProduct, { slug: string }>({
            query: ({slug}) => `/products/${slug}`,
        }),
        getProductFilters: builder.query<IProductFilters, undefined>({
            query: () => '/products/filters',
        }),
    }),
})