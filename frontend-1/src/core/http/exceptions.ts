import {IntlShape} from "react-intl";

// export interface IHttpProcessError {
//   code?: number;
//   errors?: Array<{
//     code: string;
//     detail: string;
//     attr: string | null;
//   }>;
//   server_error_type?: string;
//   type: "axios" | "stock" | "validation" | "not-found" | "auth" | "conflict" | "ERR_CONNECTION_REFUSED";
//   name?: string;
//   detail?: string;
// }
// export const getErrorsJson = (error: Error): IHttpProcessError => {
//   const response = (error as any).response;
//   if (axios.isAxiosError(error)) {
//     if (response) {
//       const errors: IHttpProcessError = {
//         code: response.status,
//         server_error_type: response.data.type,
//         type: "axios",
//         errors: response.data.errors,
//       };
//       if (response.status == 400) {
//         errors.type = "validation";
//       } else if (response.status === 401) {
//         errors.type = "auth";
//         errors.detail = errors.errors.length > 0 ? errors.errors[0].code : null;
//       } else if (response.status === 404) {
//         errors.type = "not-found";
//       } else if (response.status === 409) {
//         errors.type = "conflict";
//         errors.detail = errors.errors.length > 0 ? errors.errors[0].code : null;
//       }
//       return errors;
//     } else if (error.code === "ERR_NETWORK") {
//       return {
//         type: "ERR_CONNECTION_REFUSED",
//       };
//     }
//   } else {
//     console.error(error);
//     return {
//       name: error.name,
//       server_error_type: error.message,
//       type: "stock",
//     };
//   }
// };

export const getErrorMessage = (intl: IntlShape, data: {
  attr?: string,
  code: string,
}, prefix: string): string => {
  const basicKey = `${data.attr}.${data.code}`
  const prefix1Key = `${prefix}.${basicKey}`
  if (intl.messages[prefix1Key]) {
    return intl.formatMessage({
      id: prefix1Key
    })
  }
  const prefix2Key = `validation.${basicKey}`
  if (intl.messages[prefix2Key]) {
    return intl.formatMessage({
      id: prefix2Key
    })
  }
  if (intl.messages[basicKey]) {
    return intl.formatMessage({
      id: basicKey
    })
  }
  else {
    return data.code
  }
}
