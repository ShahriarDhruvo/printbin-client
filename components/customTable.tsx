import {
    Th,
    Tr,
    Text,
    Icon,
    Flex,
    Table,
    Tbody,
    Thead,
    Input,
    Select,
    Button,
    Tooltip,
    InputGroup,
    NumberInput,
    TableContainer,
    NumberInputField,
    InputRightElement,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import {
    MdOutlineArrowBackIosNew,
    MdOutlineArrowForwardIos,
} from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import React, { PropsWithChildren, useState } from "react";

import { FeatureWrapper } from "./wrappers";
import { CURRENT_DATE, MIN_DATE, processValue, TableStateT } from "./helpers";

export const CustomTable = ({
    headers,
    children,
    tableState,
    setTableState,
    totalPageCount,
}: PropsWithChildren<{
    headers: string[];
    totalPageCount: number;
    tableState: TableStateT;
    setTableState: (params: TableStateT) => void;
}>): JSX.Element => {
    const [searchMsg, setSearchMsg] = useState(tableState.search);
    const [currentPage, setCurrentPage] = useState(tableState.page);

    const gotoPage = (page: number): void => {
        if (
            page <= 0 ||
            isNaN(page) ||
            page > totalPageCount ||
            page === tableState.page
        ) {
            setCurrentPage(tableState.page);
            return;
        }

        setTableState({
            ...tableState,
            page,
        });
    };

    return (
        <Flex direction="column">
            <Flex
                gap={5}
                mb={{ base: 3, md: 5 }}
                justifyContent="space-between"
                direction={{ base: "column-reverse", md: "row" }}
            >
                <Flex gap={5} my="auto">
                    <InputGroup>
                        <Input
                            value={searchMsg}
                            placeholder="Search by file name"
                            onChange={(e) => {
                                setSearchMsg(e.target.value);
                            }}
                        />

                        <InputRightElement>
                            <Button
                                roundedLeft="sm"
                                colorScheme="orange"
                                onClick={() => {
                                    setTableState({
                                        ...tableState,
                                        search: searchMsg,
                                    });
                                }}
                            >
                                <Icon as={BiSearchAlt} fontSize="xl" />
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Select
                        width="7em"
                        className="select"
                        textAlign="center"
                        value={tableState.limit}
                        onChange={(e) => {
                            setTableState({
                                ...tableState,
                                page: 1, // When you change the limit the pagination should start from 1 to avoid null table row glitch
                                limit: Number(e.target.value),
                            });
                        }}
                    >
                        {[10, 20, 30, 50, 100, 200].map((limit) => (
                            <option key={limit} value={limit}>
                                {limit}
                            </option>
                        ))}
                    </Select>
                </Flex>

                <Flex
                    gap={{ base: 2, lg: 5 }}
                    mx={{ base: 0, md: 0, sm: "auto" }}
                    direction={{ base: "column", lg: "row" }}
                >
                    <Flex>
                        <Input
                            min={MIN_DATE}
                            textAlign="center"
                            max={CURRENT_DATE}
                            type="datetime-local"
                            value={tableState.from}
                            onChange={(e) => {
                                setTableState({
                                    ...tableState,
                                    from: e.target.value,
                                });
                            }}
                        />
                    </Flex>

                    <Text m="auto">To</Text>

                    <Flex>
                        <Input
                            min={MIN_DATE}
                            textAlign="center"
                            max={CURRENT_DATE}
                            type="datetime-local"
                            value={tableState.to}
                            onChange={(e) => {
                                setTableState({
                                    ...tableState,
                                    to: e.target.value,
                                });
                            }}
                        />
                    </Flex>
                </Flex>
            </Flex>

            <FeatureWrapper>
                <TableContainer width="86vw">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                {headers.map((header, id) => (
                                    <Th
                                        textAlign={
                                            id === headers.length - 1
                                                ? "right"
                                                : id === 0
                                                ? "left"
                                                : "center"
                                        }
                                        key={id}
                                    >
                                        {processValue(header)}
                                    </Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>{children}</Tbody>
                    </Table>
                </TableContainer>

                <Flex
                    p={4}
                    gap={3}
                    justifyContent={{ base: "space-between", sm: "end" }}
                >
                    <Flex>
                        <Tooltip label="Previous Page">
                            <Button
                                size="sm"
                                my="auto"
                                colorScheme="orange"
                                isDisabled={tableState.page <= 1}
                                onClick={() => {
                                    gotoPage(tableState.page - 1);
                                }}
                            >
                                <Icon
                                    fontSize="xl"
                                    as={MdOutlineArrowBackIosNew}
                                />
                            </Button>
                        </Tooltip>
                    </Flex>

                    <Flex alignItems="center">
                        <Flex>
                            <NumberInput
                                mx={2}
                                min={1}
                                w="5em"
                                size="sm"
                                value={currentPage}
                                max={totalPageCount}
                                onChange={(val) => {
                                    setCurrentPage(
                                        val.length > 0 && !isNaN(Number(val))
                                            ? Number(val)
                                            : 1
                                    );
                                }}
                                onBlur={(e) => {
                                    gotoPage(
                                        e.target.value.length > 0
                                            ? Number(e.target.value)
                                            : 1
                                    );
                                }}
                            >
                                <NumberInputField textAlign="center" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                            <Text my="auto" mr={2}>
                                of
                            </Text>

                            <Text my="auto" fontWeight="bold">
                                {totalPageCount}
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex>
                        <Tooltip label="Next Page">
                            <Button
                                size="sm"
                                my="auto"
                                colorScheme="orange"
                                onClick={() => {
                                    gotoPage(tableState.page + 1);
                                }}
                                isDisabled={tableState.page >= totalPageCount}
                            >
                                <Icon
                                    fontSize="xl"
                                    as={MdOutlineArrowForwardIos}
                                />
                            </Button>
                        </Tooltip>
                    </Flex>
                </Flex>
            </FeatureWrapper>
        </Flex>
    );
};
