import React from "react";
import { NextPage } from "next";
import { UploadCredentials } from "../../features/uploadCredentials";
import { ProtectedRoute } from "../../components/protectedRoute";

const Upload: NextPage = (): JSX.Element => {
    return (
        <ProtectedRoute>
            <UploadCredentials />
        </ProtectedRoute>
    );
};

export default Upload;
