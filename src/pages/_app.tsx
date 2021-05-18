import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../Contexts/SidebarDrawerContext'
import { makeServer } from '../services/mirage'
import { ReactQueryDevtools } from 'react-query/devtools'

import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'
import { AuthProvider } from '../Contexts/AuthContext'

if (process.env.NODE_ENV === "development") {
  makeServer()
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
