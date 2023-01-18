import { Provider as JotaiProvider } from 'jotai'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <Toaster />
      <div className="h-screen px-5 py-5 overflow-auto font-mono scrollbar-hide">
        <Component {...pageProps} className="" />
      </div>
    </JotaiProvider>
  )
}

export default MyApp
