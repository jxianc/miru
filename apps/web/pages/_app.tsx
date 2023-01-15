import type { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'
import { Provider as JotaiProvider } from 'jotai'
import { client } from '../libs/urql/urql-client'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
      <JotaiProvider>
        <Toaster />
        <div className="h-screen overflow-auto font-sans scrollbar-hide">
          <Component {...pageProps} className="" />
        </div>
      </JotaiProvider>
    </UrqlProvider>
  )
}

export default MyApp
