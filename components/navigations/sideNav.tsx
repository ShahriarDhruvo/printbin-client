import {
    Img,
    Flex,
    Text,
    Stack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { IMG_URLS } from "../helpers";
import { AppRoutesUI, useTranslation } from "../../config";
import { NavItem, NavLinks } from "./navComponents";
import { AuthenticationContext } from "../../contexts/authContext";

export const SideNav = ({
    isOpen,
    onClose,
    pathname,
}: {
    isOpen: boolean;
    pathname: string;
    onClose: () => void;
}): JSX.Element => {
    const links = NavLinks();
    const { t } = useTranslation();
    const isAdminPath = pathname.split("/")[1] === "admin";
    const { authInfo } = useContext(AuthenticationContext);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerBody>
                    <Flex direction="column" height="100%">
                        <Flex my="auto" direction="column">
                            <Stack as="nav" mx="auto" spacing={10}>
                                {links.map(({ imgUrl, title, href }) => (
                                    <NavItem
                                        mt={0}
                                        key={title}
                                        href={href}
                                        title={title}
                                        highlight={href === pathname}
                                        img={
                                            <Img
                                                me={3}
                                                src={imgUrl}
                                                width="1.9em"
                                            />
                                        }
                                    />
                                ))}

                                {!isAdminPath &&
                                    authInfo?.role !== undefined &&
                                    authInfo.role > 0 && (
                                        <NavItem
                                            title={t.admin}
                                            href={AppRoutesUI.ADMIN()}
                                            img={
                                                <Img
                                                    me={3}
                                                    width="1.9em"
                                                    src={
                                                        IMG_URLS().others.admin
                                                    }
                                                />
                                            }
                                        />
                                    )}
                            </Stack>
                        </Flex>
                    </Flex>
                </DrawerBody>
                <DrawerFooter p={0}>
                    <Text
                        my={3}
                        as="span"
                        width="100%"
                        fontSize="sm"
                        color="gray.500"
                        fontWeight="600"
                        textAlign="center"
                    >
                        <Text as="span" color="red.500">
                            {process.env.NEXT_PUBLIC_PROJECT_VERSION}
                        </Text>
                        <br />
                        &copy;{new Date().getFullYear()}{" "}
                        <Text
                            as="a"
                            target="_blank"
                            textDecor="underline"
                            href="https://technovent.sust.edu/"
                        >
                            SUST SWE Technovent
                        </Text>{" "}
                        | All rights reserved
                    </Text>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
