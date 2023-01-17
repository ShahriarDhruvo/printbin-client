import React from "react";
import { Flex } from "@chakra-ui/react";

import { ShowFiles } from "../components/showFiles";
import { TextContent } from "../components/textContent";

export const TextUpload = (): JSX.Element => {
    return (
        <Flex direction="column" gap="5em">
            <TextContent />
            <ShowFiles />
        </Flex>
    );
};
