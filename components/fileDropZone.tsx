import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import React, { useCallback, useState } from "react";
import { Icon, Flex, Button, useColorModeValue, Text } from "@chakra-ui/react";

import { IMG_URLS } from "./helpers";
import { useTranslation } from "../config";
import { FeatureWrapper } from "./wrappers";

export const FileDropZone = ({
    handleSubmit,
    onFileAccepted,
}: {
    handleSubmit: () => void;
    onFileAccepted: (params: Blob) => void;
}): JSX.Element => {
    const { t } = useTranslation();
    const [fileName, setFileName] = useState<string | undefined>(undefined);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            onFileAccepted(acceptedFiles[0]);
            setFileName(acceptedFiles[0].name);
        },
        [onFileAccepted]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        multiple: false,
        accept: {
            "text/csv": [".csv"],
        },
    });

    const dropText = isDragActive
        ? "Drop the files here ..."
        : "Drag 'n' drop .csv file here, or click to select files";

    const activeBg = useColorModeValue("gray.100", "gray.600");
    const borderColor = useColorModeValue(
        isDragActive ? "teal.300" : "gray.300",
        isDragActive ? "teal.500" : "gray.500"
    );

    return (
        <FeatureWrapper
            title={t.csv_upload_warning}
            img={IMG_URLS().others.information}
        >
            <Flex p={4} gap={5} direction="column">
                {fileName !== undefined ? (
                    <Flex gap={4} justifyContent="space-between">
                        <Text my="auto">{fileName}</Text>
                        <Button
                            size="sm"
                            my="auto"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => {
                                setFileName(undefined);
                            }}
                        >
                            Cancel
                        </Button>
                    </Flex>
                ) : (
                    <Flex
                        p={10}
                        cursor="pointer"
                        direction="column"
                        borderRadius={4}
                        border="3px dashed"
                        _hover={{ bg: activeBg }}
                        borderColor={borderColor}
                        transition="background-color 0.2s ease"
                        bg={isDragActive ? activeBg : "transparent"}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon
                            mb={3}
                            mx="auto"
                            fontSize="4.5em"
                            as={FiUploadCloud}
                        />
                        <p>{dropText}</p>
                    </Flex>
                )}

                <Button
                    width="100%"
                    colorScheme="orange"
                    onClick={handleSubmit}
                    isDisabled={fileName === undefined}
                >
                    <Icon as={FiUploadCloud} me={2} mb={1} fontSize="xl" />
                    {t.upload}
                </Button>
            </Flex>
        </FeatureWrapper>
    );
};
