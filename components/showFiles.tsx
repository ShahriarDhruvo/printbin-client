import { Td, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { CustomTable } from "./customTable";
import { CustomError, CustomSpinner } from "./frequents";
import { StatusT, TableStateT, TableStateDV, processValue } from "./helpers";

export interface FilesT {
    name: string;
    time: string;
    status: string;
}

export const ShowFiles = (): JSX.Element => {
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

    const headers = ["s/n", "name", "time", "status"];

    // Dummy content
    useEffect(() => {
        const files = [
            {
                name: "lol1",
                status: "error",
                time: "2012-01-26T13:51:50.417-07:00",
            },
            {
                name: "lol1",
                status: "pending",
                time: "2012-01-26T13:51:50.417-07:00",
            },
            {
                name: "lol1",
                status: "completed",
                time: "2012-01-26T13:51:50.417-07:00",
            },
            {
                name: "lol1",
                status: "pending",
                time: "2012-01-26T13:51:50.417-07:00",
            },
            {
                name: "lol1",
                status: "error",
                time: "2012-01-26T13:51:50.417-07:00",
            },
        ];

        setData({ ...data, files });

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

    const handleStatusColor = (status: string): string => {
        if (status === "error") return "red";
        else if (status === "pending") return "orange.500";
        else return "green";
    };

    if (status === "loading") return <CustomSpinner />;
    if (typeof status === "object") return <CustomError error={status} />;

    return (
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
                    <Td
                        maxW="sm"
                        overflow="hidden"
                        textAlign="center"
                        textOverflow="ellipsis"
                    >
                        {processValue(file.name)}
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
                    <Td
                        textAlign="right"
                        textColor={handleStatusColor(file.status)}
                    >
                        {processValue(file.status)}
                    </Td>
                </Tr>
            ))}
        </CustomTable>
    );
};
