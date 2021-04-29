import { Flex } from "@chakra-ui/layout";
import { SideBar } from "../components/Form/Sidebar";
import { Header } from "../components/Header";

export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh">
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar />
            </Flex>
        </Flex>
    )
}