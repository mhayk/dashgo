import { createContext, ReactNode, useState } from "react";
import { setCookie } from 'nookies'
import { api } from "../services/api";
import Router from 'next/router'

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    user: User;
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await api.post('sessions', {
                email,
                password
            }, {
                // url: 'sessions',
                baseURL: 'http://localhost:3333'
            })

            const { token, refreshToken, permissions, roles } = response.data

            // localStorage -> just client-side
            // sessionStorage
            // cookies -> client-side and server-side

            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/' // global
            })
            setCookie(undefined, 'nextauth.refreshtoken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/' // global
            })

            setUser({
                email,
                permissions,
                roles,
            })

            console.log(response)

            Router.push("dashboard")

        } catch (err) {
            console.log(err)
        }


    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}