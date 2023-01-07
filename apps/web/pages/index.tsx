import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useMeQuery } from '../generated/graphql'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'

export default function Web() {
  const router = useRouter()
  const [{ data: meData }] = useMeQuery()
  const [_currUser, setCurrUser] = useAtom(setCurrUserAtom)

  useEffect(() => {
    if (meData?.me) {
      setCurrUser(meData.me)
      router.push(`/create`)
    }
  }, [meData, setCurrUser])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="font-semibold text-[40px] ">
        A better way to manage your event.
      </h1>
      <button
        className="flex items-center justify-center gap-5 p-5 border hover:cursor-pointer rounded-xl "
        onClick={() => {
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/sign-in`
        }}
      >
        <FcGoogle className="text-2xl" />
        <p>Continue with google</p>
      </button>
    </div>
  )
}
