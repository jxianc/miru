// references:
// - https://github.com/lfades/next-with-apollo/blob/main/src/withApollo.tsx
// - https://github.com/benawad/jwt-auth-example/blob/nextjs-finished-code/web-nextjs/lib/apollo.tsx

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import cookie from 'cookie'
import jwtDecode from 'jwt-decode'
import { NextPage } from 'next'
import App from 'next/app'
import React from 'react'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../accesstoken-operation'
import { isServer } from '../is-server'
import {
  ApolloContext,
  InitApolloClient,
  InitApolloOptions,
  JwtPayload,
  WithApolloOptions,
  WithApolloProps,
  WithApolloState,
} from './apollo-types'
import { onError } from '@apollo/client/link/error'

// Gets the display name of a JSX component for dev tools
function getDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || 'Unknown'
}

function withApollo<TCache = any>(
  client: InitApolloClient<TCache>,
  options: WithApolloOptions = {},
) {
  type ApolloProps = Partial<WithApolloProps<TCache>>

  return (
    Page: NextPage<any> | typeof App,
    pageOptions: WithApolloOptions = {},
  ) => {
    const getInitialProps = Page.getInitialProps
    const getDataFromTree =
      'getDataFromTree' in pageOptions
        ? pageOptions.getDataFromTree
        : options.getDataFromTree
    const render = pageOptions.render || options.render
    const onError = pageOptions.onError || options.onError

    function WithApollo({
      apollo,
      apolloState,
      router,
      serverAccessToken,
      ...props
    }: ApolloProps) {
      if (!isServer() && serverAccessToken) {
        setAccessToken(serverAccessToken)
      }
      const apolloClient =
        apollo || initApolloClient(client, { initialState: apolloState?.data })
      if (render) {
        return render({
          Page: Page as NextPage<any>,
          props: { ...props, apollo: apolloClient },
        })
      }

      return <Page {...props} apollo={apolloClient} />
    }

    WithApollo.displayName = `WithApollo(${getDisplayName(Page)})`

    if (getInitialProps || getDataFromTree) {
      WithApollo.getInitialProps = async (pageCtx: ApolloContext) => {
        const ctx = 'Component' in pageCtx ? pageCtx.ctx : pageCtx
        const router = 'Component' in pageCtx ? pageCtx.router : undefined
        const { AppTree } = pageCtx
        const headers = ctx.req ? ctx.req.headers : {}

        // if we in the server, fetch refresh token here
        let serverAccessToken = ''
        if (isServer()) {
          const cookies = cookie.parse(headers?.cookie || '')
          if (cookies[process.env.NEXT_PUBLIC_RT_COOKIE as string]) {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh_token`,
              {
                method: 'POST',
                credentials: 'include',
                headers: {
                  cookie:
                    process.env.NEXT_PUBLIC_RT_COOKIE +
                    '=' +
                    cookies[process.env.NEXT_PUBLIC_RT_COOKIE as string],
                },
              },
            )
            const data = await response.json()
            serverAccessToken = data.accessToken
          }
        }

        const apollo = initApolloClient(client, {
          ctx,
          headers,
          router,
          serverAccessToken,
        })
        const apolloState: WithApolloState<TCache> = {}

        let pageProps = {}
        if (getInitialProps) {
          ctx.apolloClient = apollo
          pageProps = await getInitialProps(pageCtx as any)
        }

        if (isServer()) {
          if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
            return pageProps
          }

          if (getDataFromTree) {
            try {
              const props = { ...pageProps, apolloState, apollo }
              const appTreeProps =
                'Component' in pageCtx ? props : { pageProps: props }

              await getDataFromTree(<AppTree {...appTreeProps} />)
            } catch (error) {
              if (onError) {
                onError(error as Error, ctx)
              } else {
                // Prevent Apollo Client GraphQL errors from crashing SSR.
                if (process.env.NODE_ENV !== 'production') {
                  // tslint:disable-next-line no-console This is a necessary debugging log
                  console.error(
                    'GraphQL error occurred [getDataFromTree]',
                    error,
                  )
                }
              }
            }

            apolloState.data = apollo.cache.extract()
          }
        }

        // To avoid calling initApollo() twice in the server we send the Apollo Client as a prop
        // to the component, otherwise the component would have to call initApollo() again but this
        // time without the context, once that happens the following code will make sure we send
        // the prop as `null` to the browser
        ;(apollo as any).toJSON = () => {
          return null
        }

        return {
          ...pageProps,
          apolloState,
          apollo,
          serverAccessToken,
        }
      }
    }

    return WithApollo
  }
}

let _apolloClient: ApolloClient<any> | null = null
function initApolloClient<TCache = any>(
  createClient: InitApolloClient<TCache>,
  options?: InitApolloOptions<TCache>,
) {
  if (isServer()) {
    return createClient({
      initialState: options?.initialState,
      serverAccessToken: options?.serverAccessToken,
    })
  }

  if (!_apolloClient) {
    _apolloClient = createClient({ initialState: options?.initialState })
  }

  return _apolloClient
}

const createApolloClient: InitApolloClient<any> = ({
  initialState,
  serverAccessToken,
}) => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: 'include',
  })

  const requestLink = new ApolloLink((operation, forward) => {
    const accessToken = isServer() ? serverAccessToken : getAccessToken()
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    }))
    return forward(operation)
  })

  const refreshTokenLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      if (isServer()) {
        return false
      }
      const accessToken = getAccessToken()
      if (!accessToken) {
        // no access token in local storage
        return false
      }

      // check if access token is expired
      const { exp } = jwtDecode<JwtPayload>(accessToken)
      // Date.now() return mseconds unix time, exp has seconds unix time
      if (Date.now() < exp * 1000) {
        // accesstoken is not expired
        return true
      } else {
        return false
      }
    },
    fetchAccessToken: async () => {
      return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh_token`,
        {
          method: 'POST',
          credentials: 'include',
        },
      )
    },
    handleFetch: (accessToken) => {
      if (!isServer()) {
        setAccessToken(accessToken)
      }
    },
    handleError: async (err) => {
      // full control over handling token fetch Error
      if (!isServer()) {
        console.warn('Your refresh token is invalid. Try to relogin')
        console.error(err)

        // call logout query here and remove access token
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_out`, {
          method: 'POST',
          credentials: 'include',
        })
        removeAccessToken()

        // TODO: redirect to homepage?
      }
    },
  })

  // Log any GraphQL errors or network error that occurred
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  return new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache().restore(initialState || {}),
    link: from([refreshTokenLink, requestLink, errorLink, httpLink]),
  })
}

export default withApollo(createApolloClient, {
  render: ({ Page, props }) => {
    return (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    )
  },
})
