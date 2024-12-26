import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    IFilterItemRangeTypeProps,
    IFilterItemSelectTypeProps,
    IFilterItemTextTypeProps,
    TFilterKeyValueProps,
} from "./filter.types.ts";
import {IOffer, IProductBrand, IProductCategory} from "@/core/models/IProduct.ts";

interface IModelFiltersProps {

}

interface IProductFilterProps {
    price?: IFilterItemRangeTypeProps<number>,
    category_list?: IFilterItemSelectTypeProps<IProductCategory>,
    brand_list?: IFilterItemSelectTypeProps<IProductBrand>,
    offer_list?: IFilterItemSelectTypeProps<IOffer>,
    search?: IFilterItemTextTypeProps,
    discount__gte?: IFilterItemTextTypeProps,
}

interface IGlobalSearchFilterProps {
    query?: IFilterItemTextTypeProps,
}


export interface IFiltersState {
    product_list: TFilterKeyValueProps<IProductFilterProps>;
    search: TFilterKeyValueProps<IGlobalSearchFilterProps>;
}

const initialState: {
        filters: IFiltersState;
    } = {
        filters: {
            product_list: {
                filters: {
                    price: {
                        // key: "price",
                        type: "range",
                        data: {
                            from: 0,
                            to: 500,
                        }
                    },
                    category_list: {
                        // key: "category_list",
                        type: "select",
                        multiple: true,
                        data: [],
                    },
                    brand_list: {
                        // key: "brand_list",
                        type: "select",
                        multiple: true,
                        data: []
                    },
                    offer_list: {
                        // key: "offer_list",
                        type: "select",
                        multiple: false,
                        data: []
                    },
                    search: {
                        // key: "search",
                        type: "text",
                        data: "",
                    },
                    discount__gte: {
                        type: "text",
                        data: "",
                    }
                },
                pagination: {
                    page: 1,
                    page_size:
                        10,
                }
            },
            search: {
                filters: {
                    query: {
                        type: "text",
                        data: "",
                    }
                }
            }
        }
    }
;


export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        clearAppliedFilters(state, action: PayloadAction<Array<keyof IFiltersState>>) {
            action.payload.forEach(key => {
                const state_model_value = state.filters[key];
                if (state_model_value === undefined) {
                    throw new Error(`${key} does not exist in applied filters.`)
                }
                state_model_value.filters = initialState.filters[key].filters;
            });
        },
        setAppliedFilters(state, action: PayloadAction<Partial<IFiltersState>>) {
            Object.keys(action.payload).forEach((key) => {
                const typed_key = key as keyof IFiltersState;
                const state_model_value = state.filters[typed_key];
                if (state_model_value === undefined) {
                    throw new Error(`${key} does not exist in applied filters.`)
                }
                if (action.payload[typed_key] === undefined) {
                    return;
                }
                if (!(action.payload[typed_key]!).filters) {
                    throw new Error(`Passed value does not have required filters data.`)
                }
                Object.keys((action.payload[typed_key]!).filters).forEach((filters_key) => {
                    const type_filters_key = filters_key as keyof IModelFiltersProps;
                    const state_filter_item_value = state_model_value.filters[type_filters_key] as IModelFiltersProps
                    if (state_filter_item_value === undefined) {
                        throw new Error(`${type_filters_key} does not exist in applied filters.`)
                    }
                    (state_filter_item_value as {
                        data: unknown
                    }).data = ((action.payload[typed_key]!).filters[type_filters_key]! as { data: unknown }).data;
                });
            });
        },
    },
});
export const {setAppliedFilters, clearAppliedFilters} =
    filterSlice.actions;
