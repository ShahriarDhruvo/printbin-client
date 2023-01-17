import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../config";
import { AppLayout } from "../components/wrappers";
import { SWRConfigurationContextProvider } from "../contexts";
import { AuthenticationContextProvider } from "../contexts/authContext";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ChakraProvider theme={theme}>
            <AuthenticationContextProvider>
                <AppLayout>
                    <SWRConfigurationContextProvider>
                        <Component {...pageProps} />
                    </SWRConfigurationContextProvider>
                </AppLayout>
            </AuthenticationContextProvider>
        </ChakraProvider>
    );
}
