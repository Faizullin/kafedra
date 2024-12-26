import { IUser } from "../IUser";

export interface IAuthResponse {
    refresh_expiration: Date;
    access: string,
    refresh: string,
    user: IUser
}