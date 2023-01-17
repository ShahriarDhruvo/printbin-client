import { IconType } from "react-icons";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdHelp } from "react-icons/io";
import { FiRefreshCw } from "react-icons/fi";
import {
    Box,
    Flex,
    Icon,
    Text,
    Link,
    Image,
    Alert,
    Button,
    HStack,
    Spinner,
    AlertTitle,
    AlertDescription,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Tooltip,
} from "@chakra-ui/react";

import { FeatureWrapper } from ".";
import { spacing, useTranslation } from "../config";
import { API_ENDPOINTS, ErrorT, TitleProps } from "./helpers";
import { AuthenticationContext } from "../contexts/authContext";

export const Title = ({ icon, title, mt }: TitleProps): JSX.Element => (
    <Flex alignItems="center" mx="auto" fontSize="md">
        <Icon mr={title !== undefined ? 2 : 0} as={icon} fontSize="xl" />
        {title !== undefined && (
            <Text mt={mt !== undefined ? mt : 1}>{title}</Text>
        )}
    </Flex>
);

export const CustomSpinner = ({ text }: { text?: string }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Flex direction="column">
            <Spinner
                mx="auto"
                size="xl"
                thickness="5.5px"
                color="orange.600"
                emptyColor="gray.200"
            />
            <Text mt={3}>{text !== undefined ? text : t.loading}</Text>
        </Flex>
    );
};

export const CustomError = ({ error }: { error: ErrorT }): JSX.Element => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <Alert
            p={4}
            status="error"
            variant="subtle"
            borderRadius="xl"
            textAlign="center"
            flexDirection="column"
            border="0.5px solid red"
            width={{ base: "20em", sm: "25em", md: "30em" }}
        >
            <Flex direction="column">
                <Image
                    mx="auto"
                    alt="Error"
                    width="7em"
                    height="5em"
                    rounded="xl"
                    src="/gifs/error.gif"
                />

                {error.status !== undefined && (
                    <AlertTitle mt={4} fontSize="lg">
                        {error.status}
                    </AlertTitle>
                )}

                <AlertDescription mt={3} px={4}>
                    {typeof error.message === "string" &&
                        error.message.charAt(0).toUpperCase() +
                            error.message.slice(1)}
                </AlertDescription>
            </Flex>

            <HStack mt={4} width="100%">
                <Button
                    size="md"
                    width="100%"
                    variant="outline"
                    colorScheme="red"
                    onClick={() => {
                        router.reload();
                    }}
                >
                    <Icon me={2} fontSize="lg" as={FiRefreshCw} />
                    <Text mt={1}>{t.reload}</Text>
                </Button>

                {error.help !== undefined && (
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={error.help}
                        style={{ width: "100%" }}
                    >
                        <Button
                            width="100%"
                            colorScheme="red"
                            variant="outline"
                        >
                            <Icon me={2} fontSize="lg" as={IoMdHelp} />
                            <Text mt={1}>{t.help}</Text>
                        </Button>
                    </a>
                )}
            </HStack>
        </Alert>
    );
};

export const SignInPrompt = (): JSX.Element => {
    const { t } = useTranslation();
    const { locale } = useRouter();
    const { currentPath } = useContext(AuthenticationContext);

    return (
        <FeatureWrapper>
            <Flex
                fontWeight="600"
                direction="column"
                textAlign="center"
                alignItems="center"
                p={spacing.between_main_cards}
                gap={spacing.between_main_cards}
            >
                <Image
                    rounded="xl"
                    alt="Security"
                    src="/gifs/security.gif"
                    height={{ base: "10em", md: "15em" }}
                />
                <Box fontSize="lg">{t.auth_required_msg}</Box>
                <Box>
                    <Button
                        as={Link}
                        variant="link"
                        colorScheme="facebook"
                        textDecoration="none !important"
                        href={API_ENDPOINTS(locale, currentPath).oauth.login}
                    >
                        <Icon me={2} as={FcGoogle} fontSize="xl" />
                        <Text mt={1}>{t.sign_in_with_google}</Text>
                    </Button>
                </Box>
            </Flex>
        </FeatureWrapper>
    );
};

export const CustomTooltip = ({
    label,
    children,
}: PropsWithChildren<{ label: string | undefined }>): JSX.Element =>
    label !== undefined ? (
        <Tooltip hasArrow bg="orange.400" label={label}>
            {children}
        </Tooltip>
    ) : (
        <>{children}</>
    );

export const ButtonWithConfirmation = ({
    size,
    modalBody,
    modalTitle,
    toolTipLabel,
    confirmAction,
    actionIconFont,
    actionButtonImg,
    actionButtonText,
    actionButtonIcon,
    actionButtonStyles,
}: {
    size?: string;
    modalBody: string;
    modalTitle?: string;
    toolTipLabel?: string;
    actionIconFont?: string;
    actionButtonImg?: string;
    confirmAction: () => any;
    actionButtonText?: string;
    actionButtonIcon?: IconType;
    actionButtonStyles?: {
        color?: string;
        variant?: string;
        colorScheme?: string;
    };
}): JSX.Element => {
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <CustomTooltip label={toolTipLabel}>
                <Button size={size} onClick={onOpen} {...actionButtonStyles}>
                    <Icon
                        me={1}
                        as={actionButtonIcon}
                        fontSize={
                            actionIconFont !== undefined ? actionIconFont : "xl"
                        }
                    />
                    {actionButtonText !== undefined && (
                        <Text mt={1}>{actionButtonText}</Text>
                    )}
                </Button>
            </CustomTooltip>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    {modalTitle !== undefined && (
                        <ModalHeader>{modalTitle}</ModalHeader>
                    )}
                    <ModalCloseButton />

                    <ModalBody>{modalBody}</ModalBody>

                    <ModalFooter>
                        <Button
                            variant="outline"
                            colorScheme="orange"
                            onClick={() => {
                                confirmAction();
                                onClose();
                            }}
                        >
                            {t.confirm_again}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
