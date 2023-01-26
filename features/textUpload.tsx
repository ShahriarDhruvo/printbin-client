import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";

import { OwnRequests } from "../components/ownRequests";
import { TextContent } from "../components/textContent";

export const TextUpload = (): JSX.Element => {
    const [refreshList, setRefreshList] = useState(false);

    return (
        <Flex direction="column" gap="5em">
            <TextContent
                refreshList={refreshList}
                setRefreshList={setRefreshList}
            />
            <OwnRequests refreshList={refreshList} />
        </Flex>
    );
};
