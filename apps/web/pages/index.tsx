import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai'
import { Dialog, Transition } from '@headlessui/react'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'
import { motion } from 'framer-motion'
import { useHelloQuery, useMeQuery } from '../generated/graphql'
import { FcGoogle } from 'react-icons/fc'
import withApollo from '../libs/apollo/with-apollo'
import { getDataFromTree } from '@apollo/react-ssr'
import { useAuth } from '../libs/hooks/use-auth'

type toShow = 'organizers' | 'participants'

export function Web() {
  const router = useRouter()
  const [toShow, setToShow] = useState<toShow>('organizers')
  const [userLogin, setUserLogin] = useState(false)
  let completeButtonRef = useRef(null)

  const [_currUser, setCurrUser] = useAtom(setCurrUserAtom)

  const { meFetching, isLoggedIn } = useAuth(router, setCurrUser, true)

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: any) => {
      const delay = 0
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      }
    },
  }

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
        // redirecting to create page
        <div>redirecting...</div>
      ) : (
        <div
          className={`relative flex flex-col items-center justify-around h-full gap-10 ${
            toShow == 'participants' && 'bg-black'
          }`}
        >
          {/* Top Button */}
          <div className="flex gap-10 ">
            <div
              onClick={() => setToShow('organizers')}
              className={`p-2 px-5 text-sm border border-black rounded-lg cursor-pointer  ${
                toShow == 'participants' && 'bg-black text-white border-white'
              }`}
            >
              For Organizers
            </div>
            <div
              onClick={() => setToShow('participants')}
              className={`p-2 px-5 text-sm  border border-black rounded-lg cursor-pointer ${
                toShow == 'participants'
                  ? 'bg-white text-black '
                  : 'text-white bg-black '
              }`}
            >
              For Participants
            </div>
          </div>
          {/* Middle text */}
          <div
            className={`flex flex-col gap-10 transition duration-700 ease-in-out ${
              toShow == 'participants' && 'text-white'
            }`}
          >
            <h1
              className={`md:text-[60px] font-extrabold max-w-[900px] text-center `}
            >
              {toShow == 'organizers'
                ? 'Manage your university event has never been this easy.'
                : `This is where you browse University's events.`}
            </h1>
            {toShow == 'organizers' ? (
              <p className=" max-w-[1000px] text-center">
                We make
                <span className="font-extrabold"> collecting forms</span>,
                managing{' '}
                <span className="font-extrabold">participants data </span>
                and
                <span className="font-extrabold"> feedback </span>
                easy,
                <span className="font-extrabold"> in one place.</span>
              </p>
            ) : (
              <p className=" max-w-[1000px] text-center">
                Now you can view the
                <span className="font-extrabold">
                  {' '}
                  ratings, events and more details{' '}
                </span>
                of <span className="font-extrabold">all Organizations </span>
                at your University.
                <span className="font-extrabold"> Easy and simple. </span>
              </p>
            )}
          </div>
          {/* Bottom button */}
          <div
            className={`flex items-center justify-center gap-2 p-4 px-5 text-sm border rounded-full cursor-pointer whitespace-nowrap ${
              toShow == 'organizers'
                ? 'text-white bg-black '
                : 'text-black bg-white '
            }`}
            onClick={() => {
              if (toShow == 'organizers') {
                setUserLogin(true)
              }
            }}
          >
            <div>
              {toShow == 'organizers' ? 'Get Started!' : 'Browse Events'}
            </div>
            <ArrowRightCircleIcon height={20} width={20} />
          </div>
          <Transition show={userLogin} as={Fragment}>
            <Dialog
              initialFocus={completeButtonRef}
              as="div"
              className="relative z-10"
              open={userLogin}
              onClose={() => setUserLogin(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-out duration-700"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 bg-black/100"
                  aria-hidden="true"
                />
              </Transition.Child>
              <div className="fixed inset-0 overflow-y-auto">
                {/* Container to center the panel */}
                <div className="flex items-center justify-center min-h-full p-4">
                  {' '}
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition-opacity ease-out duration-700"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Panel className="max-w-sm mx-auto bg-black rounded-lg p-7">
                      <Dialog.Title className="text-2xl font-bold text-center text-white ">
                        Welcome to UniSpace
                      </Dialog.Title>
                      <Dialog.Description className="my-4 text-center text-slate-500">
                        Select a way to continue
                      </Dialog.Description>
                      <button
                        ref={completeButtonRef}
                        className="flex items-center justify-center w-full gap-5 p-3 text-white bg-blue-500 hover:cursor-pointer rounded-xl"
                        onClick={() => {
                          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/sign-in`
                        }}
                      >
                        <AiOutlineGoogle className="text-2xl" />
                        <p>Continue with Google</p>
                      </button>
                      <motion.svg
                        width="300"
                        height="300"
                        viewBox="0 0 600 600"
                        initial="hidden"
                        animate="visible"
                        className="fixed inset-0 pointer-events-none fill-transparent"
                      >
                        <motion.rect
                          width="600"
                          strokeWidth="4"
                          height="400"
                          x="0"
                          y="0"
                          rx="30"
                          stroke="#fff"
                          variants={draw}
                          custom={1}
                        />
                      </motion.svg>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      )}
    </>
  )
}

// Login button
{
  /*  */
}
export default withApollo(Web, { getDataFromTree })
