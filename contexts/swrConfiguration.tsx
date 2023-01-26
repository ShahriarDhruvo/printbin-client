import axios from "axios";
import React, { PropsWithChildren } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

const swrConfig: SWRConfiguration = {
    fetcher: async ({
        url,
        body,
        method,
        headers,
        queryParams,
    }: {
        body?: any;
        url: string;
        method: string;
        headers?: object;
        queryParams?: object;
    }) => {
        if (queryParams !== undefined) {
            const params = new URLSearchParams();

            Object.entries(queryParams).map(([key, value]) =>
                // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                params.append(key, value)
            );

            url += "?" + params.toString();
        }

        if (body !== undefined) {
            body = JSON.stringify(body);
        }

        try {
            const response = await axios({
                url,
                method,
                headers,
                data: body,
                withCredentials: true,
            });

            return response.data.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                throw Object.assign(new Error(err.response?.data.message), {
                    status: err.response?.status,
                    message: err.response?.data.message,
                });
            }
        }
    },
};

export const SWRConfigurationContextProvider = ({
    children,
}: PropsWithChildren): JSX.Element => (
    <SWRConfig value={swrConfig}>{children}</SWRConfig>
);
