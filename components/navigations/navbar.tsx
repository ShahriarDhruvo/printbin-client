import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { TopNav } from "./topNav";
import { SideNav } from "./sideNav";

export const Navbar = (): JSX.Element => {
    const { pathname } = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onClose, [pathname]);

    return (
        <>
            <TopNav
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                pathname={pathname}
            />
            {isOpen && (
                <SideNav
                    isOpen={isOpen}
                    onClose={onClose}
                    pathname={pathname}
                />
            )}
        </>
    );
};
