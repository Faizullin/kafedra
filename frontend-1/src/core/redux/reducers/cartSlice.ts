import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "@/core/models/IProduct.ts";
import {ICart} from "@/core/models/ICart.ts";
import CartStorageService from "@/core/services/CartStorageService.ts";

export interface IInitialState {
    items: EntityState<ICart<IProduct>, string>
}

const itemsAdapter = createEntityAdapter({
    selectId: (item: ICart<IProduct>) => item.item_id,
})

const get_initial_data = () => {
    const data = CartStorageService.getCartItems() || [];
    const new_data: Record<string, ICart<IProduct>> = {}
    data.forEach(item => {
        new_data[item.item_id] = item;
    })
    return new_data;
}

const initialState: IInitialState
    = {
    items: itemsAdapter.getInitialState(undefined, get_initial_data())
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<IProduct>) => {
            if (state.items.ids.includes(action.payload.id)) {
                throw new Error(`Cart item with item_id ${action.payload.id} exists`);
            }
            const newItem: ICart<IProduct> = {
                synced: false,
                item: action.payload,
                item_id: action.payload.id,
                quantity: 1,
            }
            itemsAdapter.upsertOne(state.items, newItem)
            CartStorageService.setStorageData(Object.values(state.items.entities));
        },
        removeProductsFromCart: (state, action: PayloadAction<string[]>) => {
            itemsAdapter.removeMany(state.items, action.payload);
            CartStorageService.setStorageData(Object.values(state.items.entities));
        },
        setCartData: (state, action: PayloadAction<ICart<IProduct>>) => {
            const existingItem = state.items.entities[action.payload.item_id]
            if (existingItem !== undefined) {
                state.items.entities[action.payload.item_id] = action.payload;
            }
            CartStorageService.setStorageData(Object.values(state.items.entities));
        }
    }
})


export const {addProductToCart, removeProductsFromCart, setCartData} = cartSlice.actions
