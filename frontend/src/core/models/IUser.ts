import {ITimestampedModel} from "./common/ITimestampedModel.ts";

export interface IUser extends ITimestampedModel {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
}
