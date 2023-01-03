import React from 'react'
import Image from 'next/image'
import { setNavbarStatusAtom, NavbarState } from '../libs/atom/navbar.atom'
import { atom, useAtom } from 'jotai'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [navbarStatus, setNavbarStatus] = useAtom(setNavbarStatusAtom)
  return (
    <div className="flex flex-row items-center justify-between w-full p-5 border border-black rounded-xl">
      {/* front part */}
      <div> Hey, Ley Kwan</div>

      {/* end part */}
      <div className="flex flex-row items-center justify-center gap-8">
        <div
          className={` hover:cursor-pointer ${
            navbarStatus === 'create' && `underline underline-offset-8`
          }`}
          onClick={() => setNavbarStatus('create')}
        >
          Create Event
        </div>
        <div
          className={` hover:cursor-pointer ${
            navbarStatus === 'manage' && `underline underline-offset-8`
          }`}
          onClick={() => setNavbarStatus('manage')}
        >
          Manage My Event
        </div>
        <div
          className={` hover:cursor-pointer ${
            navbarStatus === 'registered_event' &&
            `underline underline-offset-8`
          }`}
          onClick={() => setNavbarStatus('registered_event')}
        >
          Registered Event
        </div>
        <Image
          width={40}
          height={40}
          className="rounded-full"
          src="https://media.licdn.com/dms/image/C5603AQGrADSoKzdbnQ/profile-displayphoto-shrink_400_400/0/1661447582600?e=1678320000&v=beta&t=gxdqoNAv0qZ_blSbIJzzawYfg5cF_mGf2UPmlOHnBgQ"
          alt="Rounded avatar"
        />
      </div>
    </div>
  )
}

export default Navbar
