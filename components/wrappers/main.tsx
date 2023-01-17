import { Center, Flex } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

import { spacing } from "../../config";

export const MainWrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return (
        <Center
            mx="auto"
            as={Flex}
            flexGrow={1}
            maxWidth="85em"
            p={spacing.between_main_cards}
            gap={spacing.between_main_cards}
            direction={{ base: "column", lg: "row" }}
        >
            {children}
        </Center>
    );
};
