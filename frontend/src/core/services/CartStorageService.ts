import {ICart} from "@/core/models/ICart.ts";
import {IProduct} from "@/core/models/IProduct.ts";

export default class CartStorageService {

    public static clean(): void {
        localStorage.removeItem("cart");
    }

    public static getStorageData() {
        return localStorage.getItem("cart") || null;
    }

    public static setStorageData(data: ICart<IProduct>[]) {
        localStorage.setItem("cart", JSON.stringify({
            items: data,
        }));
        return data;
    }

    public static getCartItems(): ICart<IProduct>[] | null {
        const storage_data = this.getStorageData();
        if (storage_data === null) {
            return null;
        }
        return JSON.parse(storage_data).items as ICart<IProduct>[];
    }
}
