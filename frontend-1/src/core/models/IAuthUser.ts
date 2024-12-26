import { IFile } from "./IFile";
import { ITimestampedModel } from "./common/ITimestampedModel.ts";

export interface IAuthUser extends ITimestampedModel {
  username: string;
  email: string;
  roles: string[];
  profile?: IFile;
  is_staff: boolean;
}
export interface IJwtData {
    access_token: string;
    refresh_token: string;
    refresh_expiration: Date;
}
