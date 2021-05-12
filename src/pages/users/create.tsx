import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { SideBar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { Input } from "../../components/Form/Input";
import Link from "next/link";

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Name required'),
    email: yup.string().required('E-mail required').email('E-mail invalid'),
    password: yup.string().required('Password required').min(6, 'Minimun 6 characters'),
    password_confirmation: yup.string().required('Password required').oneOf([
        null, yup.ref('password')
    ], 'The passwords needs to match')
})

export default function CreateUser() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))

        console.log(values)
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal">Create a user</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="name"
                                label="Full name"
                                error={formState.errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                error={formState.errors.email}
                                {...register('email')} />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Password"
                                {...register('password')}
                                error={formState.errors.password}
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Password confirmation"
                                {...register('password_confirmation')}
                                error={formState.errors.password_confirmation}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users/create" passHref>
                                <Button colorScheme="whiteAlpha">Cancel</Button>
                            </Link>
                            <Button
                                type="submit"
                                colorScheme="pink"
                                isLoading={formState.isSubmitting}
                            >
                                Save
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box >
    );
}