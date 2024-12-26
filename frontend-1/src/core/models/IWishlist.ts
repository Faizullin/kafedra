export interface IWishlist<T> {
    item?: T;
    item_id: string;
    quantity: number;
    synced: boolean;
}