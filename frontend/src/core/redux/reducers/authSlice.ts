import {IAuthUser, IJwtData,} from "@/core/models/IAuthUser";
import AuthStorageService from "@/core/services/AuthStorageService";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILoadingState} from "@/core/models/common/ILoadingState.ts";


export interface IAuthInitialState {
    user: IAuthUser | null;
    jwt_data: IJwtData | null,
    isAuthenticated: boolean;
    loading: ILoadingState;
}

const get_initial_data = () => {
    const {user, jwt_data} = AuthStorageService.getStorageData();
    if (user && jwt_data) {
        const initialUserObj = JSON.parse(user) as IAuthUser;
        const initialJwtObj = JSON.parse(jwt_data) as IJwtData;
        return {
            user: initialUserObj,
            jwt_data: initialJwtObj,
            isAuthenticated: true,
        }
    }
    return {}
}

const initialState: IAuthInitialState = {
    user: null,
    jwt_data: null,
    isAuthenticated: false,
    loading: {
        detail: false,
    },
    ...get_initial_data(),
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            AuthStorageService.clean();
            state.isAuthenticated = false;
        },
        setJwtData: (state, action: PayloadAction<IJwtData>) => {
            AuthStorageService.setStorageData({
                jwt_data: JSON.stringify(action.payload),
            });
            state.jwt_data = action.payload
        },
        setAuthUser: (state, action: PayloadAction<IAuthUser>) => {
            AuthStorageService.setStorageData({
                user: JSON.stringify(action.payload),
            });
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        checkAuth: (state) => {
            if (state.isAuthenticated && state.user) {
                const decoded_data = AuthStorageService.getJwtData();
                if (decoded_data !== null) {
                    const now = new Date();
                    const expires_at_date = new Date(decoded_data.refresh_expiration);
                    console.log("checkAuth", expires_at_date, now)
                    if (now > expires_at_date) {
                        AuthStorageService.clean();
                        state.isAuthenticated = false;
                    }
                }
            }
        },
    },
});

export const {logout, checkAuth, setJwtData, setAuthUser,} = authSlice.actions;
