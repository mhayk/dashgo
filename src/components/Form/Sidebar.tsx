import Icon from "@chakra-ui/icon";
import { Box, Stack, Text, Link } from "@chakra-ui/layout";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

export function SideBar() {
    return (
        <Box as="aside" w="64" mr="8">
            <Stack spacing="12" align="flex-start">
                <Box>
                    <Text
                        fontWeight="bold"
                        color="gray.400"
                        fontSize="small"
                    >
                        MAIN
                    </Text>
                    <Stack spacing="4" mt="8" align="stretch">
                        <Link display="flex" align="center">
                            <Icon as={RiDashboardLine} fontSize="20" />
                            <Text ml="4" fontWeight="bold">Dashboard</Text>
                        </Link>
                        <Link display="flex" align="center">
                            <Icon as={RiContactsLine} fontSize="20" />
                            <Text ml="4" fontWeight="bold">Users</Text>
                        </Link>
                    </Stack>
                </Box>

                <Box>
                    <Text
                        fontWeight="bold"
                        color="gray.400"
                        fontSize="small"
                    >
                        AUTOMATION
                    </Text>
                    <Stack spacing="4" mt="8" align="stretch">
                        <Link display="flex" align="center">
                            <Icon as={RiInputMethodLine} fontSize="20" />
                            <Text ml="4" fontWeight="bold">Forms</Text>
                        </Link>
                        <Link display="flex" align="center">
                            <Icon as={RiGitMergeLine} fontSize="20" />
                            <Text ml="4" fontWeight="bold">Automation</Text>
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}