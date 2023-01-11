import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMeQuery, User } from '../../generated/graphql'

/**
 * custom hook to check if user logged in, set current user
 * @param router for redirecting user to login page
 * @param setCurrUser to set current user
 */
export const useMe = (
  router: NextRouter,
  setCurrUser: (user: User | null) => void,
) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [{ data, fetching }] = useMeQuery()

  useEffect(() => {
    if (!fetching) {
      if (!data?.me) {
        router.push('/')
      } else {
        setIsLoggedIn(true)
        setCurrUser(data.me)
      }
    }
  }, [data, fetching])

  return {
    meFetching: fetching,
    isLoggedIn,
  }
}
