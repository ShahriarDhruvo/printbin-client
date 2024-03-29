import axios from "axios";
import { StatusT } from "./types";

export const processValue = (val: any): any => {
    if (typeof val === "string") {
        let res = "";

        val.split("_").map(
            (s) => (res += s.charAt(0).toUpperCase() + s.slice(1) + " ")
        );

        return res;
    }

    return val;
};

export const fetchData = async ({
    url,
    body,
    method,
    headers,
    setData,
    onSuccess,
    setStatus,
    setMessage,
    silentError,
    queryParams,
    noStringify,
    setProgress,
}: {
    body?: any;
    url: string;
    headers?: any;
    method: string;
    queryParams?: object;
    noStringify?: boolean;

    setData?: (param: any) => void;
    onSuccess?: (params?: string) => any;
    setStatus?: (param: StatusT) => void;
    setMessage?: (param: string) => void;
    silentError?: (params: string) => void;
    setProgress?: (params: number) => void;
}): Promise<void> => {
    if (setStatus !== undefined)
        setStatus(setProgress !== undefined ? "progress" : "loading");

    if (queryParams !== undefined) {
        const params = new URLSearchParams();

        Object.entries(queryParams).map(([key, value]) =>
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            params.append(key, value)
        );

        url += "?" + params.toString();
    }

    if (noStringify === undefined || !noStringify) {
        body = JSON.stringify(body);
    }

    try {
        const response = await axios({
            url,
            method,
            headers,
            data: body,
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
                if (
                    setProgress !== undefined &&
                    progressEvent.total !== undefined &&
                    progressEvent.total > 0
                ) {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    setProgress(progress);

                    if (progress === 100 && setStatus != null)
                        setStatus("loading");
                }
            },
        });

        const { data, message, error } = response.data;

        data !== undefined && setData?.(data);
        error !== undefined && silentError?.(message);
        message !== undefined && setMessage?.(message);

        setStatus?.(undefined);
        error === undefined &&
            onSuccess?.(message !== undefined ? message : undefined);
    } catch (err) {
        if (setStatus != null && axios.isAxiosError(err)) {
            const status = err.response?.status;
            let message = err.response?.data.message;

            // if (status === 400)
            //     message =
            //         "There was an error communicating with the server. Please, try again.";

            if (status === 500)
                message =
                    "Something went wrong with the server. Please, try again later.";

            setStatus({
                status,
                message,
            });
        }
    }
};
