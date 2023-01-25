import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";

import {
    API_ENDPOINTS,
    fetchData,
    StatusT,
    ToastDV,
} from "../components/helpers";
import { useTranslation } from "../config";
import { FileDropZone } from "../components/fileDropZone";
import {
    CustomError,
    CustomProgress,
    CustomSpinner,
} from "../components/frequents";

export const UploadCredentials = (): JSX.Element => {
    const toast = useToast();
    const { t } = useTranslation();

    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<StatusT>(undefined);
    const [file, setFile] = useState<Blob | undefined>(undefined);

    const handleSubmit = (): void => {
        if (file !== undefined) {
            const body = new FormData();
            body.append("users", file);

            void fetchData({
                body,
                setStatus,
                setProgress,
                method: "POST",
                noStringify: true,
                url: API_ENDPOINTS().admin.base,
                onSuccess: (description) => {
                    toast({
                        ...ToastDV,
                        description,
                        status: "success",
                    });
                },
            });
        } else {
            toast({
                ...ToastDV,
                status: "error",
                description: t.empty_file,
            });
        }
    };

    if (status === "progress") return <CustomProgress progress={progress} />;
    if (typeof status === "object") return <CustomError error={status} />;
    if (status === "loading")
        return (
            <CustomSpinner
                text={progress === 100 ? t.wrapping_up : undefined}
            />
        );

    return (
        <FileDropZone handleSubmit={handleSubmit} onFileAccepted={setFile} />
    );
};
