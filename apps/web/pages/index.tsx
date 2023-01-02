import Navbar from '../components/Navbar'
import { FcGoogle } from 'react-icons/fc'
export default function Web() {
  return (
    <div className="my-5 mx-5 h-screen items-center gap-10 flex flex-col justify-center">
      <h1 className="font-mono font-semibold text-[40px] ">
        A better way to manage your event.
      </h1>
      <div
        className="hover:cursor-pointer flex font-mono justify-center items-center gap-5 border p-5 rounded-xl "
        onClick={() => console.log('print')}
      >
        <FcGoogle className="text-2xl" />
        <p>Continue with google</p>
      </div>
    </div>
  )
}
