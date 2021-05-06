import Icon from "@chakra-ui/icon";
import { Box, Stack, Text, Link } from "@chakra-ui/layout";
import React from "react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBar() {
    return (
        <Box as="aside" w="64" mr="8">
            <Stack spacing="12" align="flex-start">
                <NavSection title="MAIN">
                    <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
                    <NavLink icon={RiContactsLine}>Users</NavLink>
                </NavSection>

                <NavSection title="AUTOMATION">
                    <NavLink icon={RiInputMethodLine}>Forms</NavLink>
                    <NavLink icon={RiGitMergeLine}>Automation</NavLink>
                </NavSection>
            </Stack>
        </Box>
    )
}