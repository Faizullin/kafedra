import { IUser } from "./IUser";
import { ITimestampedModel } from "./common/ITimestampedModel.ts";

export interface IBlog extends ITimestampedModel {
  title: string;
  description: string;
  content: string;
  image: string;
  author: IUser;
}
