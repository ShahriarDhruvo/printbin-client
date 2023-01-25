import useSWR from "swr";
import { Td, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { CustomTable } from "./customTable";
import { CustomError, CustomSpinner } from "./frequents";
import {
    DataT,
    ErrorT,
    TableStateT,
    TableStateDV,
    processValue,
    API_ENDPOINTS,
    REFRESH_INTERVAL,
} from "./helpers";

export const OwnRequests = (): JSX.Element => {
    const [tableState, setTableState] = useState<TableStateT>(TableStateDV);
    const [apiParams, setApiParams] = useState<object | undefined>(undefined);
    const { data, error } = useSWR<DataT, ErrorT>(apiParams, {
        refreshInterval: REFRESH_INTERVAL,
    });

    const headers = ["s/n", "tracking_id", "status", "time"];

    useEffect(() => {
        if (tableState !== undefined) {
            const queryParams = {
                page: tableState.page,
                limit: tableState.limit,
                search: tableState.search,
            };

            setApiParams({
                queryParams,
                method: "GET",
                url: API_ENDPOINTS().file.base,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableState]);

    const handleStatusColor = (status: string): string => {
        if (status === "pending") return "orange.500";
        else return "green";
    };

    if (error != null) return <CustomError error={error} />;
    if (data == null) return <CustomSpinner />;

    return (
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
                    <Td
                        maxW="sm"
                        overflow="hidden"
                        textAlign="center"
                        textOverflow="ellipsis"
                    >
                        {file.tracking_id}
                    </Td>

                    {file.status !== undefined && (
                        <Td
                            textAlign="center"
                            textColor={handleStatusColor(file.status)}
                        >
                            {processValue(file.status)}
                        </Td>
                    )}

                    <Td textAlign="right">
                        {new Date(file.created_at).toLocaleString("en-US", {
                            hour12: true,
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                        })}
                    </Td>
                </Tr>
            ))}
        </CustomTable>
    );
};
