import {
  createClient,
  dedupExchange,
  defaultExchanges,
  fetchExchange,
} from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { authExchange } from '@urql/exchange-auth'
import { authExchangeConfig } from './auth-exchange'

export const client = createClient({
  url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    authExchange(authExchangeConfig),
    fetchExchange,
    ...defaultExchanges,
  ],
})
