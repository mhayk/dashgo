import { Flex } from '@chakra-ui/react'

import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

export function Header() {
    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            align="center"
            px="6"
        >
            <Logo />

            <SearchBox />

            <Flex align="center" ml="auto">
                <NotificationsNav />

                <Profile />
            </Flex>
        </Flex>
    )
}