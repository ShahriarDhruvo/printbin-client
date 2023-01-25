import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { ShowRooms } from "../../components/showRooms";
import { RequestedContents } from "../../features/requestedContents";
import { ProtectedRoute } from "../../components/protectedRoute";

const Pending: NextPage = () => {
    const [permittedRooms, setPermittedRooms] = useState<string[]>([]);

    useEffect(() => {
        const pr = localStorage.getItem("permittedRooms");
        if (typeof pr === "string" && pr !== "") {
            setPermittedRooms(JSON.parse(pr));
        }
    }, []);

    useEffect(() => {
        if (permittedRooms.length > 0) {
            localStorage.setItem(
                "permittedRooms",
                JSON.stringify(permittedRooms)
            );
        }
    }, [permittedRooms]);

    return (
        <ProtectedRoute>
            <Flex gap="2em" direction="column">
                <Box mx="auto" width={{ base: "100%", md: "20em" }}>
                    <ShowRooms
                        permittedRooms={permittedRooms}
                        setPermittedRooms={setPermittedRooms}
                    />
                </Box>

                <RequestedContents
                    requestType="pending"
                    permittedRooms={permittedRooms}
                />
            </Flex>
        </ProtectedRoute>
    );
};

export default Pending;
