import { IconType } from "react-icons";
import React, { PropsWithChildren } from "react";
import { Flex, Img, Text } from "@chakra-ui/react";

import { Title } from "../frequents";

type PlayerWrapperProps = PropsWithChildren<{
    img?: string;
    title?: string;
    color?: string;
    icon?: IconType;
    action?: JSX.Element;
}>;

export const FeatureWrapper = ({
    img,
    icon,
    title,
    color,
    action,
    children,
}: PlayerWrapperProps): JSX.Element => {
    return (
        <Flex
            shadow="sm"
            color={color}
            overflow="hidden"
            borderRadius="xl"
            direction="column"
            bg="rgba(255, 255, 255, 0.9)"
            border="0.5px solid lightgrey"
        >
            {(icon != null || title != null) && (
                <Flex
                    p={3}
                    shadow="sm"
                    flexShrink={1}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {img === undefined ? (
                        <Title icon={icon} title={title} />
                    ) : (
                        <Flex mx="auto" alignItems="center">
                            <Img me={2} w="1.6em" src={img} />
                            <Text pt={0.5} fontSize="md">
                                {title}
                            </Text>
                        </Flex>
                    )}

                    {action !== undefined && action}
                </Flex>
            )}
            {children}
        </Flex>
    );
};
