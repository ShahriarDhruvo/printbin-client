import dynamic from "next/dynamic";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import "@uiw/react-textarea-code-editor/dist.css";
import {
    Box,
    Text,
    Flex,
    Icon,
    Input,
    Button,
    Select,
    useToast,
} from "@chakra-ui/react";

import { FeatureWrapper } from "./wrappers/feature";
import { EXAMPLE_CODE, ToastDV } from "./helpers";

const CodeEditor = dynamic(
    async () =>
        await import("@uiw/react-textarea-code-editor").then(
            (mod) => mod.default
        ),
    { ssr: false }
);

export const TextContent = (): JSX.Element => {
    const toast = useToast();
    const [name, setName] = useState("Problem A");
    const [code, setCode] = useState(EXAMPLE_CODE);
    const [planguage, setPLanguage] = useState("cpp");

    const handleSubmit = (): void => {
        if (code === "") {
            toast({
                ...ToastDV,
                status: "error",
                description: "Content cannot be empty!",
            });
            return;
        }
        if (name === "") {
            toast({
                ...ToastDV,
                status: "error",
                description:
                    "Write a non empty unique name to identify your content",
            });
            return;
        }

        const filename = `${name}.docx`;

        const file = new File([code], filename, {
            type: "text/plain",
        });

        saveAs(file, filename);

        // const file = new JsPDF("portrait", "in", "a4");
        // file.text(code, 0.8, 0.8);
        // file.save(filename);
    };

    return (
        <FeatureWrapper>
            <Box p={4} minWidth="60vw">
                <Flex gap={3}>
                    <Box width="100%">
                        <Text mb={2}>Name</Text>
                        <Input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder="Write an unique name to identify your content later..."
                        />
                    </Box>

                    <Box>
                        <Text mb={2}>Language</Text>
                        <Select
                            width="8em"
                            value={planguage}
                            className="select"
                            textAlign="center"
                            onChange={(e) => {
                                setPLanguage(e.target.value);
                            }}
                        >
                            <option value="cpp">C/C++</option>
                            <option value="java">Java</option>
                            <option value="py">Python</option>
                            <option value="js">JavaScript</option>
                            <option value="ts">Typescript</option>
                        </Select>
                    </Box>
                </Flex>

                <Box mt={4}>
                    <Text mb={2}>Content</Text>
                    <Box
                        overflow="hidden"
                        borderRadius="md"
                        border="0.5px solid lightgrey"
                    >
                        <CodeEditor
                            value={code}
                            language={planguage}
                            placeholder="Paste your code here"
                            onChange={(evn) => {
                                setCode(evn.target.value);
                            }}
                            padding={15}
                            style={{
                                fontSize: 17,
                                backgroundColor: "#f5f5f5",
                                fontFamily:
                                    "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                            }}
                        />
                    </Box>
                </Box>

                <Button
                    mt={4}
                    float="right"
                    type="submit"
                    colorScheme="orange"
                    onClick={handleSubmit}
                >
                    <Icon as={FiUploadCloud} me={2} mb={1} fontSize="xl" />
                    Submit
                </Button>
            </Box>
        </FeatureWrapper>
    );
};
