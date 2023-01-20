import type { NextPage } from "next";
import ReactToPrint from "react-to-print";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillPrinterFill } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import { Td, Tr, Flex, Button, Icon, Box } from "@chakra-ui/react";

import { CustomTable } from "../../components/customTable";
import {
    ButtonWithConfirmation,
    CustomError,
    CustomSpinner,
} from "../../components/frequents";
import {
    FilesT,
    StatusT,
    TableStateT,
    TableStateDV,
    DUMMY_FILES,
    EXAMPLE_CODE,
} from "../../components/helpers";
import { ShowRooms } from "../../components/showRooms";
import { PrintContent } from "../../components/printContent";

const Pending: NextPage = () => {
    const pdfContentRef = useRef<any>(null);
    const [rooms, setRooms] = useState<number[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [status, setStatus] = useState<StatusT>(undefined);
    const [tableState, setTableState] = useState<TableStateT>(TableStateDV);
    const [data, setData] = useState<{
        files: FilesT[];
        totalPageCount: number;
    }>({
        files: [],
        totalPageCount: 0,
    });

    const headers = ["s/n", "room", "team_name", "id", "time", "actions"];

    // Dummy content
    useEffect(() => {
        setData({ ...data, files: DUMMY_FILES });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     sessionStorage.setItem("end-date", tableState.to);
    //     sessionStorage.setItem("start-date", tableState.from);
    // }, [tableState.from, tableState.to]);

    // useEffect(() => {
    //     if (tableState !== undefined) {
    //         const queryParams = {
    //             language: locale,
    //             page: tableState.page,
    //             limit: tableState.limit,
    //             search: tableState.search,
    //         };

    //         const headers = {
    //             "End-Date": convertToUTCFormat(tableState.to),
    //             "Start-Date": convertToUTCFormat(tableState.from),
    //         };

    //         void fetchData({
    //             headers,
    //             setStatus,
    //             queryParams,
    //             method: "GET",
    //             url: API_ENDPOINTS().admin.base,
    //             setData: (d) => {
    //                 setData({
    //                     ...data,
    //                     files: d.file_info,
    //                     totalPageCount: d.total_pages,
    //                 });
    //             },
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [tableState, locale]);

    // const handlePrint = (): void => {
    //     alert("Emon Bokachuda!");
    // };

    // const getContent = (url: string): string => {
    //     const request = new XMLHttpRequest();

    //     request.open("GET", url, true);
    //     // request.send(null);
    //     request.onreadystatechange = () => {
    //         if (request.readyState === 4 && request.status === 200) {
    //             const type = request.getResponseHeader("Content-Type");

    //             if (type !== null && type.indexOf("text") !== 1) {
    //                 return request.responseText;
    //             }
    //         }

    //         return "";
    //     };

    //     return "";
    // };

    const handleComplete = (): void => {
        // alert(EXAMPLE_CODE.split(/\r\n|\r|\n/).length);
    };

    if (status === "loading") return <CustomSpinner />;
    if (typeof status === "object") return <CustomError error={status} />;

    return (
        <Flex gap={5} direction="column">
            <Box ml="auto" width={{ base: "100%", md: "25em" }}>
                <ShowRooms rooms={rooms} setRooms={setRooms} />
            </Box>
            <CustomTable
                headers={headers}
                tableState={tableState}
                setTableState={setTableState}
                totalPageCount={data.totalPageCount}
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
                            {file.id}
                        </Td>
                        <Td textAlign="center">
                            {new Date(file.time).toLocaleString("en-US", {
                                hour12: true,
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                            })}
                        </Td>
                        <Td>
                            <Flex gap={3} justifyContent="right">
                                <Box display="none">
                                    <Box ref={pdfContentRef}>
                                        <PrintContent
                                            content={
                                                // file.url !== undefined
                                                //     ? getContent(
                                                //           "https://raw.githubusercontent.com/Bibeknam/algorithmtutorprograms/master/data-structures/red-black-trees/RedBlackTree.cpp"
                                                //       ) // file.url)
                                                //     : ""
                                                EXAMPLE_CODE
                                            }
                                            styles={{
                                                fontSize: 12,
                                                backgroundColor: "#ffffff",
                                                fontFamily:
                                                    "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <ReactToPrint
                                    trigger={() => {
                                        return (
                                            <Button
                                                size="sm"
                                                colorScheme="orange"
                                            >
                                                <Icon
                                                    me={2}
                                                    fontSize="md"
                                                    as={BsFillPrinterFill}
                                                />
                                                Print
                                            </Button>
                                        );
                                    }}
                                    content={() => pdfContentRef.current}
                                />
                                <ButtonWithConfirmation
                                    size="sm"
                                    actionIconFont="md"
                                    actionButtonText="Complete"
                                    modalTitle="Mark As Complete"
                                    confirmAction={handleComplete}
                                    actionButtonIcon={FaCheckCircle}
                                    actionButtonStyles={{
                                        colorScheme: "green",
                                    }}
                                    modalBody="Are you sure you want to mark this file as Complete?"
                                />
                            </Flex>
                        </Td>
                    </Tr>
                ))}
            </CustomTable>
        </Flex>
    );
};

export default Pending;
