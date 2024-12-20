import {IOffer, IProductBrand, IProductCategory} from "@/core/models/IProduct.ts";

export interface IProductListParams {
    page: number;
    page_size: number;
    categories?: Array<number | string>;
    brands?: Array<number | string>;
    price__range_min?: number;
    price__range_max?: number;
    search?: string;
    discount__gte_min?: number;
}

export interface IProductFilters {
    categories: Array<IProductCategory>;
    brands: Array<IProductBrand>;
    offers: Array<IOffer>;
}