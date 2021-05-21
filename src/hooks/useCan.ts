import { useContext } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { validateUserPermissions } from "../utils/validadeUserPermissions"

type UseCanParams = {
    permissions?: string[];
    roles?: string[];
}

export function useCan({ permissions, roles }: UseCanParams) {
    const { user, isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {
        return false
    }

    const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
    })

    return userHasValidPermissions
}