import Navbar from '../components/Navbar'
import { FcGoogle } from 'react-icons/fc'
export default function Web() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="font-semibold text-[40px] ">
        A better way to manage your event.
      </h1>
      <div
        className="flex items-center justify-center gap-5 p-5 border hover:cursor-pointer rounded-xl "
        onClick={() => console.log('print')}
      >
        <FcGoogle className="text-2xl" />
        <p>Continue with google</p>
      </div>
    </div>
  )
}
