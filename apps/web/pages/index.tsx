import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'
import { useMe } from '../libs/hooks/use-me'

export default function Web() {
  const router = useRouter()
  const [_currUser, setCurrUser] = useAtom(setCurrUserAtom)
  const { meFetching, isLoggedIn } = useMe(router, setCurrUser)

  useEffect(() => {
    if (!meFetching && isLoggedIn) {
      router.push('/create')
    }
  }, [meFetching, isLoggedIn])

  return (
    <>
      {meFetching ? (
        <div>loading...</div>
      ) : isLoggedIn ? (
        <div>redirectig...</div>
      ) : (
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
      )}
    </>
  )
}
