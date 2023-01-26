import React, { useContext, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import "@uiw/react-textarea-code-editor/dist.css";

import { PrintContent } from "./printContent";
import { BsFillPrinterFill } from "react-icons/bs";
import { FeatureWrapper } from "./wrappers/feature";
import { AuthenticationContext } from "../contexts/authContext";
import {
    ButtonWithConfirmation,
    CustomError,
    CustomSpinner,
} from "./frequents";
import {
    API_ENDPOINTS,
    EXAMPLE_CODE,
    fetchData,
    genID,
    StatusT,
    ToastDV,
} from "./helpers";

export const TextContent = ({
    refreshList,
    setRefreshList,
}: {
    refreshList: boolean;
    setRefreshList: (params: boolean) => void;
}): JSX.Element => {
    const toast = useToast();
    const [code, setCode] = useState(EXAMPLE_CODE);
    const { authInfo } = useContext(AuthenticationContext);
    const [status, setStatus] = useState<StatusT>(undefined);
    const [remainingPage, setRemainingPage] = useState(
        authInfo?.available_print_page_count
    );

    const handleRequest = (): void => {
        if (code === "") {
            toast({
                ...ToastDV,
                status: "error",
                description: "Content cannot be empty!",
            });
            return;
        }

        if (authInfo !== undefined) {
            const trackingId = genID();
            const filename = `${trackingId}.txt`;
            const content =
                `Room Number: ${authInfo.room_number}, Team Name: ${authInfo.team_name}, ID: ${trackingId}\n\n` +
                code;

            const queryParams = {
                pages: Math.ceil(code.split(/\r\n|\r|\n/).length / 57),
            };

            const headers = {
                "Tracking-ID": trackingId,
            };

            const file = new File([content], filename, {
                type: "text/plain",
            });

            const body = new FormData();
            body.append("file", file);

            void fetchData({
                body,
                headers,
                setStatus,
                queryParams,
                method: "POST",
                noStringify: true,
                url: API_ENDPOINTS().file.base,
                setData: (data) => {
                    setRemainingPage(data.available_print_page_count);
                },
                onSuccess: (description) => {
                    setRefreshList(!refreshList);
                    setCode(EXAMPLE_CODE);

                    toast({
                        ...ToastDV,
                        description,
                        status: "success",
                    });
                },
            });
        } else {
            toast({
                ...ToastDV,
                status: "error",
                description: "Unauthorized access is prohibited",
            });
        }
    };

    if (status === "loading") return <CustomSpinner />;
    if (typeof status === "object") return <CustomError error={status} />;

    return (
        <>
            {authInfo !== undefined && authInfo.username !== "admin" && (
                <FeatureWrapper>
                    <Flex
                        p={4}
                        textAlign="center"
                        justifyContent="space-evenly"
                        gap={{ base: 2, md: undefined }}
                        direction={{ base: "column", md: "row" }}
                    >
                        <Box>
                            <b>Remaining Pages:</b>{" "}
                            <span style={{ color: "red" }}>
                                {remainingPage}
                            </span>
                        </Box>
                        {authInfo.room_number !== "" && (
                            <Box>
                                <b>Room No:</b> {authInfo?.room_number}
                            </Box>
                        )}
                        {authInfo.team_name !== "" && (
                            <Box>
                                <b>Team Name:</b> {authInfo?.team_name}
                            </Box>
                        )}

                        <Box>
                            <b>Username:</b> {authInfo?.username}
                        </Box>
                    </Flex>
                </FeatureWrapper>
            )}

            <FeatureWrapper
                icon={BsFillPrinterFill}
                title="Make a request to print this content"
            >
                <Box p={4} minWidth="60vw">
                    <Box
                        overflow="hidden"
                        borderRadius="md"
                        border="0.5px solid lightgrey"
                    >
                        <PrintContent content={code} setContent={setCode} />
                    </Box>

                    {authInfo !== undefined && authInfo.username === "admin" ? (
                        <Text mt={4} textAlign="center" textColor="red.500">
                            Sorry, this feature is not supported for admins!
                        </Text>
                    ) : remainingPage !== undefined && remainingPage > 0 ? (
                        <Box mt={4} float="right">
                            <ButtonWithConfirmation
                                actionIconFont="md"
                                actionButtonText="Request"
                                modalTitle="Request to Print"
                                confirmAction={handleRequest}
                                actionButtonIcon={FiUploadCloud}
                                actionButtonStyles={{
                                    colorScheme: "orange",
                                }}
                                modalStyle={{ color: "red" }}
                                modalBody={
                                    remainingPage !== undefined
                                        ? `This action will reduce your remaining page count to ${
                                              remainingPage -
                                              Math.ceil(
                                                  code.split(/\r\n|\r|\n/)
                                                      .length / 57
                                              )
                                          }. Are you sure you want to print this content?`
                                        : "Are you sure you want to print this content?"
                                }
                            />
                        </Box>
                    ) : (
                        <Text mt={4} textAlign="center" textColor="red.500">
                            You have reached the maximum print limit for a team!
                        </Text>
                    )}
                </Box>
            </FeatureWrapper>
        </>
    );
};
