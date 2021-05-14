import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { SideBar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import Link from 'next/link'

import { useQuery } from 'react-query'

export default function UserList() {
    const { data, isLoading, error } = useQuery('users', async () => {
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json()

        return data
    })

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })


    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Users</Heading>

                        <Link href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine}
                                    fontSize="20"
                                />}
                            >
                                Create a new user
                            </Button>
                        </Link>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Error to fetch the user data.</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>User</Th>
                                        {isWideVersion && <Th>Registration Date</Th>}
                                        <Th width="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td px={["4", "4", "6"]}>
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight="bold">Mhayk Whandson</Text>
                                                <Text fontSize="sm" color="gray.300">hi@mhayk.com</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion && <Td>04 April, 2021</Td>}
                                        <Td>
                                            <Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                            >
                                                Edit
                                    </Button>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td px={["4", "4", "6"]}>
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight="bold">Mhayk Whandson</Text>
                                                <Text fontSize="sm" color="gray.300">hi@mhayk.com</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion && <Td>04 April, 2021</Td>}
                                        <Td>
                                            <Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                            >
                                                Edit
                                    </Button>
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td px={["4", "4", "6"]}>
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight="bold">Mhayk Whandson</Text>
                                                <Text fontSize="sm" color="gray.300">hi@mhayk.com</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion && <Td>04 April, 2021</Td>}
                                        <Td>
                                            <Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                            >
                                                Edit
                                    </Button>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table >

                            <Pagination />
                        </>
                    )
                    }

                </Box >

            </Flex >
        </Box >
    );
}