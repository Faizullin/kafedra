export interface ICart<T> {
    item?: T;
    item_id: string;
    quantity: number;
    synced: boolean;
}