import React, { useState } from 'react'
import Image from 'next/image'
import { setNavbarStatusAtom, NavbarState } from '../libs/atom/navbar.atom'
import { atom, useAtom } from 'jotai'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
interface NavbarProps {
  name: string
  image?: string
}

const Navbar: React.FC<NavbarProps> = ({ name, image }) => {
  const [navbarStatus, setNavbarStatus] = useAtom(setNavbarStatusAtom)
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="flex flex-col justify-between w-full p-5 border border-black md:items-center md:flex-row rounded-xl">
      {/* front part */}
      <div className="hidden md:inline"> Hey, {name}</div>

      {showMenu ? (
        <XMarkIcon
          onClick={() => setShowMenu(!showMenu)}
          className="inline text-[eft translate-x-[-6px] w-7 md:hidden hover:cursor-pointer"
        />
      ) : (
        <Bars3Icon
          onClick={() => setShowMenu(!showMenu)}
          className="inline text-left w-7 md:hidden hover:cursor-pointer"
        />
      )}
      {/* end part */}
      <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:justify-center md:items-center ">
        <div
          className={` md:inline  hover:cursor-pointer ${
            navbarStatus === 'create' && `underline underline-offset-8`
          } ${showMenu ? `inline mt-1` : `hidden`}`}
          onClick={() => setNavbarStatus('create')}
        >
          Create Event
        </div>
        <div
          className={` ${
            showMenu ? `inline` : `hidden`
          } md:inline  hover:cursor-pointer ${
            navbarStatus === 'manage' && `underline underline-offset-8`
          } `}
          onClick={() => setNavbarStatus('manage')}
        >
          Manage My Event
        </div>
        <div
          className={` md:inline hover:cursor-pointer ${
            navbarStatus === 'registered_event' &&
            `underline underline-offset-8`
          }  ${showMenu ? `inline` : `hidden`}`}
          onClick={() => setNavbarStatus('registered_event')}
        >
          Registered Event
        </div>
        <Image
          width={40}
          height={40}
          className="hidden rounded-full md:inline"
          src={
            image ||
            'https://media.licdn.com/dms/image/C5603AQGrADSoKzdbnQ/profile-displayphoto-shrink_400_400/0/1661447582600?e=1678320000&v=beta&t=gxdqoNAv0qZ_blSbIJzzawYfg5cF_mGf2UPmlOHnBgQ'
          }
          alt="Rounded avatar"
        />
      </div>
    </div>
  )
}

export default Navbar
