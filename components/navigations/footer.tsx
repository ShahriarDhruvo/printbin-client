import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const Footer = (): JSX.Element => (
    <Box
        my={3}
        width="100%"
        fontSize="xs"
        color="gray.500"
        textAlign="center"
        h={{ base: "6.5em", md: "5em" }}
        style={{ position: "relative", bottom: 0 }}
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
        <br />
        Developed with ❤️ by{" "}
        <Text
            as="a"
            target="_blank"
            textDecor="underline"
            href="https://www.linkedin.com/in/tashfi04/"
        >
            Mohammad Akhlaqur Rahman
        </Text>
        {" & "}
        <Text
            as="a"
            target="_blank"
            textDecor="underline"
            href="https://shahriardhruvo.netlify.app/"
        >
            Shahriar Elahi Dhruvo
        </Text>
        <Box display="none">
            <a title="icons" href="https://www.flaticon.com/free-icons/">
                Icons created by - Flaticon
            </a>
        </Box>
    </Box>
);
