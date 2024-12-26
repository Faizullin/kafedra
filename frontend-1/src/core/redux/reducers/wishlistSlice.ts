import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "@/core/models/IProduct.ts";
import {IWishlist} from "@/core/models/IWishlist.ts";
import WishlistStorageService from "@/core/services/WishlistStorageService.ts";

export interface IInitialState {
    items: EntityState<IWishlist<IProduct>, string>
}

const itemsAdapter = createEntityAdapter({
    selectId: (item: IWishlist<IProduct>) => item.item_id,
})

const get_initial_data = () => {
    const data = WishlistStorageService.getWishlistItems() || [];
    const new_data: Record<string, IWishlist<IProduct>> = {}
    data.forEach(item => {
        new_data[item.item_id] = item;
    })
    return new_data;
}

const initialState: IInitialState
    = {
    items: itemsAdapter.getInitialState(undefined, get_initial_data())
}
export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addProductToWishlist: (state, action: PayloadAction<IProduct>) => {
            if (state.items.ids.includes(action.payload.id)) {
                throw new Error(`Wishlist item with item_id ${action.payload.id} exists`);
            }
            const newItem: IWishlist<IProduct> = {
                synced: false,
                item: action.payload,
                item_id: action.payload.id,
                quantity: 1,
            }
            itemsAdapter.upsertOne(state.items, newItem)
            WishlistStorageService.setStorageData(Object.values(state.items.entities));
        },
        removeProductsFromWishlist: (state, action: PayloadAction<string[]>) => {
            itemsAdapter.removeMany(state.items, action.payload);
            WishlistStorageService.setStorageData(Object.values(state.items.entities));
        },
        setWishlistData: (state, action: PayloadAction<IWishlist<IProduct>>) => {
            const existingItem = state.items.entities[action.payload.item_id]
            if (existingItem !== undefined) {
                state.items.entities[action.payload.item_id] = action.payload;
            }
            WishlistStorageService.setStorageData(Object.values(state.items.entities));
        }
    }
})


export const {addProductToWishlist, removeProductsFromWishlist, setWishlistData} = wishlistSlice.actions
