import {IJwtData} from "@/core/models/IAuthUser.ts";

interface IAuthStorageData {
    user?: string;
    jwt_data?: string;
    is_authenticated?: string;
}


export default class AuthStorageService {
    public static authStorageConstantKeys: Array<keyof IAuthStorageData> = [
        "user", "is_authenticated", "jwt_data",
    ]

    public static clean(): void {
        this.authStorageConstantKeys.forEach((key) => {
            localStorage.removeItem(key);
        });
    }

    public static getStorageData(): IAuthStorageData {
        const data: Record<string, string | null> = {};
        this.authStorageConstantKeys.forEach((key) => {
            data[key] = localStorage.getItem(key) || null;
        });
        return data;
    }

    public static setStorageData(data: IAuthStorageData) {
        this.authStorageConstantKeys.forEach((key) => {
            if (data[key] !== undefined) {
                localStorage.setItem(key, data[key]);
            }
        });
        return data;
    }

    public static getJwtData(): IJwtData | null {
        const raw_jwt_data = this.getStorageData()['jwt_data']
        if (raw_jwt_data === undefined) {
            return null;
        }
        return JSON.parse(raw_jwt_data) as IJwtData;
    }

    public static getCurrentAccessToken(): string | null {
        return this.getJwtData()?.access_token || null;
    }
}
