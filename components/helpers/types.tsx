import { ToastPosition } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface FilesT {
    url?: string;
    status?: string;
    created_at: string;
    team_name?: string;
    tracking_id: string;
    room_number?: number;
}

export interface DataT {
    files: FilesT[];
    total_pages: number;
}

export interface ErrorT {
    help?: string;
    status?: number;
    message: string;
}

export interface AuthInfoT {
    role: number;
    username: string;
    team_name: string;
    room_number: string;
    available_print_page_count: number;
}

export interface TableStateT {
    page: number;
    limit: number;
    search: string;
}

export interface AuthContextT {
    currentPath: string;
    authInfo: AuthInfoT | undefined;
    handleLogout: () => Promise<void>;
    setAuthInfo: (params: AuthInfoT) => void;
}

export type StatusT = ErrorT | "loading" | "progress" | undefined;

export interface TitleProps {
    mt?: number;
    title?: string;
    icon?: IconType;
}

export interface ToastT {
    status: string;
    variant: string;
    duration: number;
    description: string;
    isClosable: boolean;
    position: ToastPosition;
    containerStyle: {
        fontWeight: string;
    };
}

export interface NavLinksT {
    imgUrl: any;
    href: string;
    title: string;
}
