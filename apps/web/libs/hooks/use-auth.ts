import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMeQuery, User } from '../../generated/graphql'

/**
 * custom hook to check if user logged in, set current user
 * @param router for redirecting user to login page
 * @param setCurrUser to set current user
 *
 * @typedef {Object} UseAuthReturnType
 * @property {boolean} meFetching
 * @property {boolean} isLoggedIn
 *
 * @returns {UseAuthReturnType}
 */
export const useAuth = (
  router: NextRouter,
  setCurrUser: (user: User | null) => void,
  noCache: boolean = false,
) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data, loading, error } = useMeQuery({
    fetchPolicy: noCache ? 'network-only' : 'cache-first',
  })

  useEffect(() => {
    if (!loading) {
      if (!data?.me || error) {
        router.push('/')
      } else {
        setIsLoggedIn(true)
        setCurrUser(data.me)
      }
    }
  }, [data, loading])

  return {
    meFetching: loading,
    isLoggedIn,
  }
}
