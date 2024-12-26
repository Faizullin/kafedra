import {useNavigate} from "react-router-dom";
import {ConstUrls} from "../constants/urls";
import {TFetchBaseQueryErrorProps} from "@/core/redux/api/auth/auth.baseQuery.ts";

export default function useErrorPageRedirect() {
    const navigate = useNavigate();
    const error_redirect = (error: TFetchBaseQueryErrorProps) => {
        let new_location;
        if (error.status === 404) {
            new_location = ConstUrls.exception_404
        }
        // else if (error.type === 'ERR_CONNECTION_REFUSED') {
        //     new_location = ConstUrls.exception_connection
        // }
        if (new_location) {
            navigate(new_location);
        }
    };
    return {
        error_redirect,
    };
}
