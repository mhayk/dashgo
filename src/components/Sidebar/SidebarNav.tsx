import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="MAIN">
                <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                <NavLink icon={RiContactsLine} href="/users">Users</NavLink>
            </NavSection>

            <NavSection title="AUTOMATION">
                <NavLink icon={RiInputMethodLine} href="/forms">Forms</NavLink>
                <NavLink icon={RiGitMergeLine} href="/automation">Automation</NavLink>
            </NavSection>
        </Stack>
    )
}