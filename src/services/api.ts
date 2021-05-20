import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../Contexts/AuthContext';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: `Bearer ${cookies['nextauth.token']}`
    }
})

api.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    if (error.request.url.includes('localhost:3333') && error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
            // renew the token
            cookies = parseCookies()

            const { 'nextauth.refreshtoken': refreshToken } = cookies
            const originalConfig = error.config

            if (!isRefreshing) {
                isRefreshing = true

                api.post('/refresh', {
                    refreshToken
                }, {
                    baseURL: 'http://localhost:3333'
                }).then(response => {
                    const { token } = response.data

                    setCookie(undefined, 'nextauth.token', token, {
                        maxAge: 60 * 60 * 24 * 30, // 30 days
                        path: '/' // global
                    })
                    setCookie(undefined, 'nextauth.refreshtoken', response.data.refreshToken, {
                        maxAge: 60 * 60 * 24 * 30, // 30 days
                        path: '/' // global
                    })

                    api.defaults.headers['Authorization'] = `Bearer ${token}`

                    failedRequestsQueue.forEach(request => request.resolve(token))
                    failedRequestsQueue = []
                }).catch(err => {
                    failedRequestsQueue.forEach(request => request.reject(err))
                    failedRequestsQueue = []
                })
                    .finally(() => {
                        isRefreshing = false
                    })

            } else {
                //create a request queue
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        resolve: (token: string) => {
                            originalConfig.headers['Authorization'] = `Bearer ${token}`

                            resolve(api(originalConfig))
                        },
                        reject: (err: AxiosError) => {
                            reject(err)
                        }
                    })
                })
            }
        } else {
            // logout the user
            signOut();
        }

        return Promise.reject(error)
    }
})