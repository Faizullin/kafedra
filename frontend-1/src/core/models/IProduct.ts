import {IUser} from "@/core/models/IUser.ts";
import {IImageFile} from "@/core/models/IFile.ts";

export interface IProductCategory {
    id: string;
    name: string;
    slug: string;
}

export interface IProductBrand {
    id: string;
    name: string;
    slug: string;
}

export interface IOffer {
    id: string;
    name: string;
    valid_from: Date;
    valid_to: Date;
    discount: number;
}

export interface IProduct {
    id: string;
    name: string;
    slug: string;
    category: IProductCategory | null;
    brand: IProductBrand | null;
    base_price: number;
    price_of_offer: number;
    offer: IOffer | null;
    unit: string;
    rating: number | null; // Decimal fields can be represented as strings
    shortDescription: string;
    description: string;
    relatedProducts: IProduct[];
    supplier: IUser | null;
    detail_images: IImageFile[] | null;
    thumbnail_image: IImageFile | null;
}
