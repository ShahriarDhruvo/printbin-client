import { SignInPrompt } from "./frequents";
import { AuthenticationContext } from "../contexts/authContext";
import React, {
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

export const ProtectedRoute = ({
    children,
}: PropsWithChildren): JSX.Element => {
    const { authInfo } = useContext(AuthenticationContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("isAuthenticated") !== null);
    }, [authInfo]);

    return authInfo !== undefined || isAuthenticated ? (
        <>{children}</>
    ) : (
        <SignInPrompt />
    );
};
