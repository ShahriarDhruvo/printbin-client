import React, { useContext, useState } from "react";
import { Input, Box, Text, Flex, Button, Avatar } from "@chakra-ui/react";

import { API_ENDPOINTS, fetchData, RANDOM_AVATAR, StatusT } from "..";
import { FeatureWrapper } from "../wrappers/feature";
import router from "next/router";
import { AuthenticationContext } from "../../contexts/authContext";
import { CustomSpinner, CustomError } from "../frequents";
import { AppRoutesUI } from "../../config";

export const SigninForm = (): JSX.Element => {
    const [status, setStatus] = useState<StatusT>(undefined);
    const { setAuthInfo } = useContext(AuthenticationContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (): void => {
        const headers: any = {
            Username: credentials.username,
            Password: credentials.password,
        };

        void fetchData({
            headers,
            setStatus,
            method: "POST",
            setData: setAuthInfo,
            url: API_ENDPOINTS().auth.login,
            onSuccess: async () => await router.push(AppRoutesUI.HOME()),
        });
    };

    if (status === "loading") return <CustomSpinner />;
    if (typeof status === "object") return <CustomError error={status} />;

    return (
        <FeatureWrapper>
            <Avatar
                mt={5}
                mx="auto"
                src={RANDOM_AVATAR}
                border="3px solid #FEB2B2"
                name={credentials.username}
                backgroundColor="orange.200"
                width={{ base: "8em", sm: "10em" }}
                height={{ base: "8em", sm: "10em" }}
            />

            <Flex
                p={5}
                gap={5}
                direction="column"
                width={{ base: "85vw", md: "30em" }}
            >
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

                <Text fontSize="xs" color="blue.600" textAlign="center">
                    Ask
                    <span style={{ color: "red" }}> event origanizers</span> for
                    your credentials
                </Text>

                <Button
                    width="100%"
                    colorScheme="orange"
                    onClick={handleSubmit}
                >
                    Sign in
                </Button>
            </Flex>
        </FeatureWrapper>
    );
};
