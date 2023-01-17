import {
    Flex,
    Avatar,
    Text,
    Icon,
    Img,
    useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";

import { useRouter } from "next/router";
import React, { useContext } from "react";

import { IMG_URLS, NavLinksT } from "../helpers";
import { useTranslation, AppRoutesUI } from "../../config";
import { AuthenticationContext } from "../../contexts/authContext";

export const NavItem = ({
    mt,
    img,
    icon,
    href,
    title,
    highlight,
}: {
    img?: any;
    icon?: any;
    mt?: number;
    href: string;
    highlight?: boolean;
    title?: string | undefined;
}): JSX.Element => (
    <Link href={href}>
        <Flex
            p="0.7em"
            cursor="pointer"
            borderRadius="lg"
            fontWeight={
                highlight !== undefined && highlight ? "600" : undefined
            }
            color={highlight !== undefined && highlight ? "red.500" : undefined}
            _hover={{
                margin: "0.3em",
                padding: "0.4em",
                transform: "scale(1.03)",
                msTransform: "scale(1.03)",
                webkitTransform: "scale(1.03)",

                backgroundColor: "rgba(255, 214, 157, 1)",
            }}
        >
            <Flex alignItems="center" mx="auto" fontSize="md">
                {icon !== undefined ? (
                    <Icon
                        as={icon}
                        fontSize="2xl"
                        mr={title !== undefined ? 2 : 0}
                    />
                ) : (
                    img
                )}

                {title !== undefined && (
                    <Text mt={mt !== undefined ? mt : 1}>{title}</Text>
                )}
            </Flex>
        </Flex>
    </Link>
);

export const NavFixedItems = (): JSX.Element => {
    const { t } = useTranslation();
    const { pathname } = useRouter();
    // const isAdminPath = pathname.split("/")[1] === "admin";
    const { authInfo } = useContext(AuthenticationContext);

    const profileTitle = useBreakpointValue(
        {
            md: authInfo != null ? authInfo.username.split(" ")[0] : t.sign_in,
            base: undefined,
        },
        {
            fallback: "md",
        }
    );

    return (
        <Flex gap={3} alignItems="center">
            {/* I am hiding it in mobile view with the help of same logic */}
            {profileTitle !== undefined && (
                <>
                    {/* {!isAdminPath &&
                        authInfo?.role !== undefined &&
                        authInfo.role > 0 && (
                            <NavItem
                                title={t.admin}
                                href={AppRoutesUI.ADMIN()}
                                img={
                                    <Img
                                        me={3}
                                        width="1.9em"
                                        src={IMG_URLS().others.admin}
                                    />
                                }
                            />
                        )} */}

                    <NavItem
                        title={t.admin}
                        href={AppRoutesUI.ADMIN()}
                        img={
                            <Img
                                me={3}
                                width="1.9em"
                                src={IMG_URLS().others.admin}
                            />
                        }
                    />
                </>
            )}

            {authInfo != null ? (
                <>
                    <NavItem
                        img={
                            <Avatar
                                size="sm"
                                src={authInfo.photo_url}
                                me={profileTitle === undefined ? 0 : 2}
                            />
                        }
                        title={profileTitle}
                        href={AppRoutesUI.USER()}
                        highlight={AppRoutesUI.USER() === pathname}
                    />
                </>
            ) : (
                <NavItem
                    title={profileTitle}
                    href={AppRoutesUI.SIGN_IN()}
                    highlight={AppRoutesUI.SIGN_IN() === pathname}
                    img={
                        <Img
                            width="1.9em"
                            src={IMG_URLS().others.sign_in}
                            me={profileTitle === undefined ? 0 : 2}
                        />
                    }
                />
            )}
        </Flex>
    );
};

export const NavLinks = (): NavLinksT[] => {
    const { t } = useTranslation();
    const { pathname } = useRouter();
    const isAdminPath = pathname.split("/")[1] === "admin";

    return isAdminPath
        ? [
              {
                  title: "Pending Files",
                  href: AppRoutesUI.ADMIN(),
                  imgUrl: IMG_URLS().features.pending_files,
              },
              {
                  title: "Completed Files",
                  href: AppRoutesUI.COMPLETE(),
                  imgUrl: IMG_URLS().features.completed_files,
              },
          ]
        : [
              {
                  title: t.upload_text,
                  href: AppRoutesUI.UPLOAD_TEXT(),
                  imgUrl: IMG_URLS().features.upload_text,
              },
          ];
};
