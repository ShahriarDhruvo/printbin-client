import React from "react";
import type { NextPage } from "next";
import { TextUpload } from "../features";
import { ProtectedRoute } from "../components/protectedRoute";

const Home: NextPage = (): JSX.Element => {
    return (
        <ProtectedRoute>
            <TextUpload />
        </ProtectedRoute>
    );
};

export default Home;
