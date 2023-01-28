import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from '@/components/footer'
import NavBar from '@/components/NavBar'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavBar />
      <div className="min-h-[calc(100vh-41px)]">
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </div>
      <Footer />
    </SessionProvider>
  )
}
