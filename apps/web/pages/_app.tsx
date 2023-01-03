import type { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'
import { Provider as JotaiProvider } from 'jotai'
import { client } from '../libs/urql/urql-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
      <JotaiProvider>
        <div className="h-screen px-5 py-5 font-mono">
          <Component {...pageProps} />
        </div>
      </JotaiProvider>
    </UrqlProvider>
  )
}

export default MyApp
