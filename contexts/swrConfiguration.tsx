import React, { PropsWithChildren } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

const swrConfig: SWRConfiguration = {
    fetcher: async (url) => {
        const res = await fetch(url, {
            credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
            // throw {
            //     status: res.status,
            //     message: data.error,
            // };

            throw Object.assign(new Error(data.error), {
                status: res.status,
                message: data.error,
            });
        }

        return data.data;
    },
};

export const SWRConfigurationContextProvider = ({
    children,
}: PropsWithChildren): JSX.Element => (
    <SWRConfig value={swrConfig}>{children}</SWRConfig>
);
