import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { client } from '../libs/urql-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
