import { FcGoogle } from 'react-icons/fc'
import { useHelloQuery } from '../generated/graphql'

export default function Web() {
  const [{ data }] = useHelloQuery()

  console.log(data)

  return (
    <div className="my-5 mx-5 h-screen items-center gap-10 flex flex-col justify-center">
      <h1 className="font-mono font-semibold text-[40px] ">
        A better way to manage your event.
      </h1>
      <button
        className="hover:cursor-pointer flex font-mono justify-center items-center gap-5 border p-5 rounded-xl "
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
