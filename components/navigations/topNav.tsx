import React from "react";
import Link from "next/link";
import { GrClose } from "react-icons/gr";
import { RiMenuLine } from "react-icons/ri";
import {
    Divider,
    Flex,
    Heading,
    HStack,
    Icon,
    Img,
    VStack,
} from "@chakra-ui/react";

import { NavFixedItems, NavItem, NavLinks } from "./navComponents";
import { AppRoutesUI, spacing, useTranslation } from "../../config";
import { IMG_URLS } from "../helpers";

export const TopNav = ({
    isOpen,
    onOpen,
    onClose,
    pathname,
}: {
    isOpen: boolean;
    pathname: string;
    onOpen: () => void;
    onClose: () => void;
}): JSX.Element => {
    const links = NavLinks();
    const { t } = useTranslation();

    return (
        <Flex
            alignItems="center"
            py={{ base: 3, md: 8 }}
            px={spacing.between_main_cards}
            justifyContent={{ base: "space-between", md: "center" }}
        >
            <Icon
                fontSize="2xl"
                aria-label="Open Menu"
                display={{ md: "none" }}
                as={isOpen ? GrClose : RiMenuLine}
                onClick={isOpen ? onClose : onOpen}
            />
            <VStack spacing={4}>
                <Flex mx="auto" alignItems="center">
                    <Img
                        me={3}
                        src={IMG_URLS().navbar.title}
                        w={{ base: "1.7em", md: "2.2em" }}
                    />
                    <Heading
                        pt={2}
                        flexShrink={1}
                        fontFamily="Mina"
                        textAlign="center"
                        fontSize={{ base: "2em", md: "2.8em" }}
                    >
                        <Link href={AppRoutesUI.HOME()}>{t.name}</Link>
                    </Heading>
                </Flex>

                <HStack
                    as="nav"
                    spacing={3}
                    borderRadius="xl"
                    display={{ base: "none", md: "flex" }}
                    backgroundColor="rgba(255, 214, 157, 0.35)"
                >
                    {links.map(({ imgUrl, title, href }) => (
                        <NavItem
                            key={title}
                            href={href}
                            title={title}
                            highlight={href === pathname}
                            img={<Img width="1.9em" me={2} src={imgUrl} />}
                        />
                    ))}

                    <Divider
                        height="2em"
                        orientation="vertical"
                        borderLeft="1px solid red"
                    />

                    <NavFixedItems />
                </HStack>
            </VStack>

            <Flex display={{ base: "flex", md: "none" }}>
                <NavFixedItems />
            </Flex>
        </Flex>
    );
};
