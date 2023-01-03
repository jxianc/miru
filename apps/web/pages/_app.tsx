import type { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'
import { client } from '../libs/urql/urql-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider value={client}>
      <div className="h-screen px-5 py-5 font-mono">
        <Component {...pageProps} />
      </div>
    </UrqlProvider>
  )
}

export default MyApp
