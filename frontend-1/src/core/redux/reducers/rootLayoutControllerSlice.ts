import { createSlice } from "@reduxjs/toolkit";

export interface IRootLayoutControllerInitialState {
    isNavDrawerOpen: boolean;
}

const initialState: IRootLayoutControllerInitialState = {
    isNavDrawerOpen: false,
};


export const rootLayoutControllerSlice = createSlice({
    name: "rootLayoutController",
    initialState,
    reducers: {
        openNavDrawerOpen(state) {
            state.isNavDrawerOpen = true;
        },
        closeNavDrawerOpen(state) {
            state.isNavDrawerOpen = false;
        },
    },
});

export const { openNavDrawerOpen, closeNavDrawerOpen } =
    rootLayoutControllerSlice.actions;
