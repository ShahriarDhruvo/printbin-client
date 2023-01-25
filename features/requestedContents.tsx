import useSWR from "swr";
import axios from "axios";
import ReactToPrint from "react-to-print";
import { BsFillPrinterFill } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import {
    Td,
    Tr,
    Flex,
    Button,
    Icon,
    Box,
    Spinner,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

import { CustomTable } from "../components/customTable";
import { CustomError, CustomSpinner } from "../components/frequents";
import {
    DataT,
    ErrorT,
    TableStateT,
    TableStateDV,
    API_ENDPOINTS,
    REFRESH_INTERVAL,
    StatusT,
    fetchData,
    ToastDV,
} from "../components/helpers";
import { PrintContent } from "../components/printContent";

export const RequestedContents = ({
    requestType,
    permittedRooms,
}: {
    requestType: string;
    permittedRooms: string[];
}): JSX.Element => {
    const toast = useToast();
    const pdfContentRef = useRef<any>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus] = useState<StatusT>(undefined);
    const [tableState, setTableState] = useState<TableStateT>(TableStateDV);
    const [apiParams, setApiParams] = useState<object | undefined>(undefined);
    const { data, error } = useSWR<DataT, ErrorT>(apiParams, {
        refreshInterval: REFRESH_INTERVAL,
    });
    const [contentOptions, setContentOptions] = useState<{
        resolve: any;
        content: string | undefined;
    }>({
        resolve: undefined,
        content: undefined,
    });

    const headers = [
        "s/n",
        "room",
        "team_name",
        "tracking_id",
        "time",
        "actions",
    ];

    useEffect(() => {
        setTimeout(() => {
            contentOptions.resolve?.();
        }, 1000);
    }, [contentOptions]);

    useEffect(() => {
        if (tableState !== undefined) {
            const queryParams = {
                status: requestType,
                page: tableState.page,
                limit: tableState.limit,
                search: tableState.search,
            };

            setApiParams({
                queryParams,
                method: "POST",
                body: permittedRooms,
                url: API_ENDPOINTS().print.base,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableState, permittedRooms]);

    const updateContent = async (trakingId: string): Promise<void> => {
        setStatus("loading");

        await new Promise((resolve, reject) => {
            axios({
                method: "GET",
                withCredentials: true,
                url: String(API_ENDPOINTS().print.serve) + `/${trakingId}.txt`,
            })
                .then(({ data }) => {
                    setContentOptions({ content: data, resolve });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    const handleComplete = (trackingId: string): void => {
        void fetchData({
            setStatus,
            method: "PATCH",
            headers: {
                "Tracking-ID": trackingId,
            },
            url: API_ENDPOINTS().print.base,
            onSuccess: (description) => {
                toast({
                    ...ToastDV,
                    description,
                    status: "success",
                });
            },
        });
    };

    if (error != null) return <CustomError error={error} />;
    if (data == null) return <CustomSpinner />;

    return (
        <>
            {data !== undefined && (
                <CustomTable
                    headers={headers}
                    tableState={tableState}
                    setTableState={setTableState}
                    totalPageCount={data.total_pages}
                >
                    {data.files.map((file, id) => (
                        <Tr
                            key={id}
                            bg={id % 2 === 0 ? "gray.100" : undefined}
                            _hover={{
                                backgroundColor: "rgba(255, 0, 0, 0.15)",
                            }}
                        >
                            <Td>{id + 1}</Td>
                            <Td textAlign="center">{file.room_number}</Td>
                            <Td textAlign="center">{file.team_name}</Td>
                            <Td
                                maxW="sm"
                                overflow="hidden"
                                textAlign="center"
                                textOverflow="ellipsis"
                            >
                                {file.tracking_id}
                            </Td>
                            <Td textAlign="center">
                                {new Date(file.created_at).toLocaleString(
                                    "en-US",
                                    {
                                        hour12: true,
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        second: "numeric",
                                    }
                                )}
                            </Td>
                            <Td>
                                <Flex gap={3} justifyContent="right">
                                    {contentOptions.content !== undefined && (
                                        <Box display="none">
                                            <Box ref={pdfContentRef}>
                                                <PrintContent
                                                    content={
                                                        contentOptions.content
                                                    }
                                                    styles={{
                                                        fontSize: 12,
                                                        backgroundColor:
                                                            "#ffffff",
                                                        fontFamily:
                                                            "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    )}

                                    <ReactToPrint
                                        content={() => pdfContentRef.current}
                                        onBeforeGetContent={async () => {
                                            await updateContent(
                                                file.tracking_id
                                            );
                                        }}
                                        onAfterPrint={() => {
                                            setStatus(undefined);
                                            setContentOptions({
                                                resolve: undefined,
                                                content: undefined,
                                            });
                                            requestType === "pending" &&
                                                onOpen();
                                        }}
                                        trigger={() => {
                                            return (
                                                <Button
                                                    size="sm"
                                                    colorScheme="orange"
                                                    disabled={
                                                        status === "loading"
                                                    }
                                                >
                                                    {status === "loading" ? (
                                                        <Spinner
                                                            my="auto"
                                                            size="sm"
                                                            speed="0.75s"
                                                            thickness="2px"
                                                            color="red.600"
                                                            emptyColor="gray.200"
                                                        />
                                                    ) : (
                                                        <>
                                                            <Icon
                                                                me={2}
                                                                fontSize="md"
                                                                as={
                                                                    BsFillPrinterFill
                                                                }
                                                            />
                                                            Print
                                                        </>
                                                    )}
                                                </Button>
                                            );
                                        }}
                                    />

                                    {/* Complete Modal */}
                                    <Modal
                                        isCentered
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        size={{ base: "xs", sm: "md" }}
                                    >
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>
                                                Complete it!
                                            </ModalHeader>
                                            <ModalCloseButton />

                                            <ModalBody>
                                                Mark this content as completed
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button
                                                    variant="outline"
                                                    colorScheme="orange"
                                                    onClick={() => {
                                                        onClose();
                                                        handleComplete(
                                                            file.tracking_id
                                                        );
                                                    }}
                                                >
                                                    Yes, Complete it
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </CustomTable>
            )}
        </>
    );
};
