import {IWishlist} from "@/core/models/IWishlist.ts";
import {IProduct} from "@/core/models/IProduct.ts";

export default class WishlistStorageService {

    public static clean(): void {
        localStorage.removeItem("wishlist");
    }

    public static getStorageData() {
        return localStorage.getItem("wishlist") || null;
    }

    public static setStorageData(data: IWishlist<IProduct>[]) {
        localStorage.setItem("wishlist", JSON.stringify({
            items: data,
        }));
        return data;
    }

    public static getWishlistItems(): IWishlist<IProduct>[] | null {
        const storage_data = this.getStorageData();
        if (storage_data === null) {
            return null;
        }
        return JSON.parse(storage_data).items as IWishlist<IProduct>[];
    }
}
