import { useRouter } from "next/router";
import React, {
    useState,
    useEffect,
    createContext,
    PropsWithChildren,
} from "react";
import {
    AuthInfoT,
    fetchData,
    AuthContextT,
    API_ENDPOINTS,
} from "../components";
import { AppRoutesUI } from "../config";

export const AuthenticationContext = createContext<AuthContextT>({
    currentPath: "",
    authInfo: undefined,
    setAuthInfo: () => {},
    handleLogout: async () => {
        await Promise.resolve();
    },
});

export const AuthenticationContextProvider = ({
    children,
}: PropsWithChildren): JSX.Element => {
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState(AppRoutesUI.HOME());
    const [authInfo, setAuthInfo] = useState<AuthInfoT | undefined>(undefined);

    useEffect(() => {
        void fetchData({
            method: "GET",
            setData: setAuthInfo,
            url: API_ENDPOINTS().user.is_auth,
        });

        setCurrentPath(router.pathname);
    }, [router.pathname]);

    useEffect(() => {
        authInfo === undefined
            ? localStorage.removeItem("isAuthenticated")
            : localStorage.setItem("isAuthenticated", "true");
    }, [authInfo]);

    const handleLogout = async (): Promise<void> => {
        await fetchData({
            method: "GET",
            url: API_ENDPOINTS().user.logout,
            onSuccess: async () => {
                setAuthInfo(undefined);
                await router.push(AppRoutesUI.HOME());
            },
        });
    };

    return (
        <AuthenticationContext.Provider
            value={{ currentPath, authInfo, setAuthInfo, handleLogout }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
