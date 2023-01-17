import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/react";

import { Footer, Navbar } from "../navigations";
import { MainWrapper } from "./main";

export const AppLayout = ({ children }: PropsWithChildren): JSX.Element => {
    const { locale } = useRouter();

    return (
        <Flex
            minHeight="100vh"
            direction="column"
            bg="rgba(0, 0, 0, 0.02)"
            className={locale === "bn" ? "bn-font" : "en-font"}
        >
            <Navbar />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
        </Flex>
    );
};
