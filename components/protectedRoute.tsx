import { SignInPrompt } from "./frequents";
import React, { PropsWithChildren, useEffect, useState } from "react";

export const ProtectedRoute = ({
    children,
}: PropsWithChildren): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("isAuthenticated") !== null);
    }, []);

    return isAuthenticated ? <>{children}</> : <SignInPrompt />;
};
