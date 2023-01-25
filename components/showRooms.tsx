import React, { useEffect, useState } from "react";
import { MdOutlineRoom } from "react-icons/md";
import { Checkbox, Flex, Text } from "@chakra-ui/react";

import { API_ENDPOINTS, fetchData, ROOM_COUNT, StatusT } from "./helpers";
import { FeatureWrapper } from "./wrappers/feature";
import { CustomSpinner, CustomError } from "./frequents";

export const ShowRooms = ({
    permittedRooms,
    setPermittedRooms,
}: {
    permittedRooms: string[];
    setPermittedRooms: (params: string[]) => void;
}): JSX.Element => {
    const PER_ROW = 3;
    const [rooms, setRooms] = useState<string[]>([]);
    const [status, setStatus] = useState<StatusT>(undefined);

    useEffect(() => {
        void fetchData({
            setStatus,
            method: "GET",
            setData: (data) => {
                setRooms(data.rooms);
            },
            url: API_ENDPOINTS().print.rooms,
        });
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        roomNo: string
    ): void => {
        if (e.target.checked && !permittedRooms.includes(roomNo)) {
            setPermittedRooms([...permittedRooms, roomNo]);
        } else {
            setPermittedRooms(permittedRooms.filter((room) => room !== roomNo));
        }
    };

    if (status === "loading") return <CustomSpinner />;
    if (typeof status === "object") return <CustomError error={status} />;

    return (
        <>
            {rooms !== undefined && (
                <FeatureWrapper icon={MdOutlineRoom} title="Select Rooms">
                    <Flex p={5} gap={3} direction="column">
                        {[...Array(Math.ceil(ROOM_COUNT / PER_ROW))].map(
                            (_, i) => (
                                <Flex
                                    key={i}
                                    minWidth="5em"
                                    justifyContent="space-between"
                                >
                                    {[
                                        ...Array(
                                            Math.min(
                                                PER_ROW,
                                                ROOM_COUNT - i * PER_ROW
                                            )
                                        ),
                                    ].map((_, j) => (
                                        <Checkbox
                                            key={j}
                                            className="checkbox"
                                            defaultChecked={permittedRooms.includes(
                                                rooms[i * PER_ROW + j]
                                            )}
                                            onChange={(e) => {
                                                handleChange(
                                                    e,
                                                    rooms[i * PER_ROW + j]
                                                );
                                            }}
                                        >
                                            <Text pt={1}>
                                                {rooms[i * PER_ROW + j]}
                                            </Text>
                                        </Checkbox>
                                    ))}
                                </Flex>
                            )
                        )}
                    </Flex>
                </FeatureWrapper>
            )}
        </>
    );
};
