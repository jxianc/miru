import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'

interface ManageProps {}

const Manage: NextPage<ManageProps> = ({}) => {
  // atom
  const [currUser, setCurrUser] = useAtom(setCurrUserAtom)

  // router
  const router = useRouter()

  // graphql query
  const [{ data: meData, fetching }] = useMeQuery()

  useEffect(() => {
    if (!meData?.me) {
      router.push('/')
    } else {
      setCurrUser(meData.me)
    }
  }, [meData, setCurrUser])

  return <div>manage my event</div>
}

export default Manage
