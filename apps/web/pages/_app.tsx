import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen px-5 py-5 font-mono">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
