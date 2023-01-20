import React from "react";
import { MdOutlineRoom } from "react-icons/md";
import { Checkbox, Flex, Text } from "@chakra-ui/react";

import { ROOM_COUNT } from "./helpers";
import { FeatureWrapper } from "./wrappers/feature";

export const ShowRooms = ({
    rooms,
    setRooms,
}: {
    rooms: number[];
    setRooms: (params: number[]) => void;
}): JSX.Element => {
    const PER_ROW = 3;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        roomNo: number
    ): void => {
        if (e.target.checked) {
            setRooms([...rooms, roomNo]);
        } else {
            setRooms(rooms.filter((room) => room !== roomNo));
        }
    };

    return (
        <FeatureWrapper icon={MdOutlineRoom} title="Select Rooms">
            <Flex p={5} gap={3} direction="column">
                {[...Array(Math.ceil(ROOM_COUNT / PER_ROW))].map((_, i) => (
                    <Flex minWidth="5em" key={i} justifyContent="space-between">
                        {[
                            ...Array(
                                Math.min(PER_ROW, ROOM_COUNT - i * PER_ROW)
                            ),
                        ].map((_, j) => (
                            <Checkbox
                                key={j}
                                className="checkbox"
                                onChange={(e) => {
                                    handleChange(e, i * PER_ROW + j + 1);
                                }}
                            >
                                <Text pt={1}>Room {i * PER_ROW + j + 1}</Text>
                            </Checkbox>
                        ))}
                    </Flex>
                ))}
            </Flex>
        </FeatureWrapper>
    );
};
