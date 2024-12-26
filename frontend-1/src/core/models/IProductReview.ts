import {IUser} from "./IUser";
import {ITimestampedModel} from "./common/ITimestampedModel.ts";

export interface IProductReview extends ITimestampedModel {
    first_name: string;
    last_name: string;
    image: string;
    comment: string;
    author: IUser;
}
