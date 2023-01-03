import { AuthConfig } from '@urql/exchange-auth'
import { makeOperation } from '@urql/core'
import { isServer } from '../is-server'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../accesstoken-operation'
import jwtDecode from 'jwt-decode'
import {
  RefreshTokenDocument,
  RefreshTokenMutation,
} from '../../generated/graphql'

interface AuthState {
  accessToken: string
}

interface JwtPayload {
  userId: string
  iat: number
  exp: number
}

export const authExchangeConfig: AuthConfig<AuthState> = {
  /**
   * attach authorization header to the operation (query, mutation)
   */
  addAuthToOperation: ({ authState, operation }) => {
    // the token isn't in the auth state, return the operation without authorization header
    if (!authState || !authState.accessToken) {
      return operation
    }

    // urql: fetchOptions can be a function (See Client API) but you can simplify this based on usage
    const fetchOptions =
      typeof operation.context.fetchOptions === 'function'
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {}

    // attach authorization header to the operation
    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authState.accessToken}`,
        },
      },
    })
  },

  /**
   * return true will trigger reauthentication
   */
  didAuthError: ({ error }) => {
    return error.graphQLErrors.some(
      (e) => e.extensions?.code === 'UNAUTHENTICATED',
    )
  },

  /**
   * return a boolean indicates whether an operation is likely to fail
   */
  willAuthError: ({ authState }) => {
    if (authState) {
      const { exp } = jwtDecode<JwtPayload>(authState.accessToken)
      // Date.now() return mseconds unix time, exp has seconds unix time
      if (Date.now() < exp * 1000) {
        // accesstoken is not expired
        return false
      }
    }
    // no authState or accesstoken is expired
    return true
  },

  /**
   * get authState
   * @returns {AuthState}
   */
  getAuth: async ({ authState, mutate }): Promise<AuthState | null> => {
    // make sure it is not in the server
    if (!isServer()) {
      // for initial launch, fetch the auth state from local storage
      if (!authState) {
        const accessToken = getAccessToken()
        if (accessToken) {
          const { exp } = jwtDecode<JwtPayload>(accessToken)
          // Date.now() return mseconds unix time, exp has seconds unix time
          if (Date.now() < exp * 1000) {
            // accesstoken is not expired
            return { accessToken }
          }
        }
      }

      /**
       * urql:
       * the following code gets executed when an auth error has occurred
       * we should refresh the token if possible and return a new auth state
       * If refresh fails, we should log out
       **/

      /**
       * urql:
       * if your refresh logic is in graphQL, you must use this mutate function to call it
       * if your refresh logic is a separate RESTful endpoint, use fetch or similar
       */
      const response = await mutate<RefreshTokenMutation>(RefreshTokenDocument)
      console.log('refreshing in urql')

      if (
        response.data?.refreshToken.success &&
        response.data?.refreshToken.accessToken
      ) {
        // save the new tokens in storage for next restart
        setAccessToken(response.data.refreshToken.accessToken)
        // return the new tokens
        return {
          accessToken: response.data.refreshToken.accessToken,
        }
      }

      // otherwise, if refresh fails, clear local storage and log out
      removeAccessToken()

      // urql: your app logout logic should trigger here
      // logout();

      return null
    }
    return null
  },
}
