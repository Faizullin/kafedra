import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {HelmetProvider} from "react-helmet-async";
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import store from "./core/redux/store";
import LangConfig from "./localization/LangConfig";
import router from "./router/router";
import appTheme from "./theme/appTheme";
import Loader from "@/shared/components/loader/Loader.tsx";

import "@/assets/scss/index.scss";

const langData = LangConfig.getLangConfig();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={appTheme}>
            <React.Suspense fallback={<Loader/>}>
                <IntlProvider
                    locale={langData.lang}
                    defaultLocale="en"
                    messages={langData.messages}
                >
                    <Provider store={store}>
                        <HelmetProvider>
                            <RouterProvider router={router}></RouterProvider>
                        </HelmetProvider>
                    </Provider>
                </IntlProvider>
            </React.Suspense>
        </ChakraProvider>
    </React.StrictMode>
);
