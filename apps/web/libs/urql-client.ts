import {
  createClient,
  dedupExchange,
  defaultExchanges,
  fetchExchange,
} from 'urql'
import { devtoolsExchange } from '@urql/devtools'

export const client = createClient({
  url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    fetchExchange,
    ...defaultExchanges,
  ],
})
