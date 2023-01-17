import React, { useState } from "react";
import { Input, Box, Text, Flex, Button, Avatar } from "@chakra-ui/react";

import { FeatureWrapper } from "../wrappers/feature";

export const SigninForm = (): JSX.Element => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    return (
        <FeatureWrapper>
            <Flex
                p={4}
                gap={5}
                direction="column"
                minWidth={{ base: "85vw", md: "30em" }}
            >
                <Avatar
                    m="auto"
                    width="10em"
                    height="10em"
                    name={credentials.username}
                    src={
                        "https://api.dicebear.com/5.x/adventurer/svg?seed=" +
                        (Math.random() + 1).toString(36).substring(7)
                    }
                />

                <Box>
                    <Text mb="8px">Username</Text>
                    <Input
                        placeholder="Abcd"
                        value={credentials.username}
                        onChange={(e) => {
                            setCredentials({
                                ...credentials,
                                username: e.target.value,
                            });
                        }}
                    />
                </Box>

                <Box>
                    <Text mb="8px">Password</Text>
                    <Input
                        type="password"
                        placeholder="********"
                        value={credentials.password}
                        onChange={(e) => {
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            });
                        }}
                    />
                </Box>

                <Button width="100%" colorScheme="orange">
                    Signin
                </Button>
            </Flex>
        </FeatureWrapper>
    );
};
