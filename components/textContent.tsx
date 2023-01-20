import { saveAs } from "file-saver";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Box, useToast } from "@chakra-ui/react";
import "@uiw/react-textarea-code-editor/dist.css";

import { PrintContent } from "./printContent";
import { BsFillPrinterFill } from "react-icons/bs";
import { FeatureWrapper } from "./wrappers/feature";
import { ButtonWithConfirmation } from "./frequents";
import { EXAMPLE_CODE, genID, ToastDV } from "./helpers";

export const TextContent = (): JSX.Element => {
    const toast = useToast();
    const [code, setCode] = useState(EXAMPLE_CODE);

    const handleRequest = (): void => {
        if (code === "") {
            toast({
                ...ToastDV,
                status: "error",
                description: "Content cannot be empty!",
            });
            return;
        }

        const id = genID();
        const filename = `${id}.txt`;
        const content =
            "Room Number: 08, Team Name: SUST_N00bs!, ID: v01wg8i\n\n\n" + code;

        const file = new File([content], filename, {
            type: "text/plain",
        });

        saveAs(file, filename);
    };

    return (
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
                        modalBody="Are you sure you want to print this content?"
                    />
                </Box>
            </Box>
        </FeatureWrapper>
    );
};
