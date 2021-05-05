import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Mhayk Whandson</Text>
                <Text color="gray.300" fontSize="small">
                    hi@mhayk.com
                        </Text>
            </Box>

            <Avatar size="md" name="Mhayk Whandson" src="https://github.com/mhayk.png" />
        </Flex>
    )
}