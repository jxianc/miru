import { getDataFromTree } from '@apollo/react-ssr'
import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AboutForm } from '../components/AboutForm'
import Navbar from '../components/Navbar'
import { MainLayout } from '../layouts/MainLayout'
import withApollo from '../libs/apollo/with-apollo'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'
import { navbarStatusAtom } from '../libs/atom/navbar.atom'
import { useAuth } from '../libs/hooks/use-auth'

interface CreateProps {}

type createdEvent = 'private' | 'public' | null

const Create: NextPage<CreateProps> = ({}) => {
  // atom
  const [navbarStatus] = useAtom(navbarStatusAtom)
  const [currUser, setCurrUser] = useAtom(setCurrUserAtom)
  const [createdEvent, setCreatedEvent] = useState<createdEvent>(null)

  // router
  const router = useRouter()

  const { meFetching, isLoggedIn } = useAuth(router, setCurrUser)

  return (
    <>
      {meFetching ? (
        <div>loading...</div>
      ) : isLoggedIn ? (
        <MainLayout>
          <Navbar
            name={currUser?.name || `user${currUser?.id}`}
            image={currUser?.image || undefined}
          />
          {navbarStatus === 'create' && createdEvent === null && (
            <div>
              <h1 className="py-10 text-3xl text-center">My event is...</h1>
              <div className="flex items-center justify-center gap-28">
                {/* Left card */}
                <div className="flex flex-col items-center justify-evenly border w-[30%] border-black h-[60vh] rounded-xl">
                  <h1 className="text-xl font-bold">Private</h1>
                  <div className="flex flex-col items-center justify-center gap-7 min-h-[180px]">
                    <div className="text-gray-400">
                      <span className="font-black text-black">One stop </span>
                      admin dashboard
                    </div>
                    <div className="text-gray-400">
                      <span className="font-black text-black">Directed </span>
                      Invitations{' '}
                    </div>
                    <div className="text-gray-400">
                      <span className="font-black text-black">
                        Fully-customisable{' '}
                      </span>
                      e-invitation card{' '}
                    </div>
                    <div className="text-gray-400">
                      <span className="font-black text-black">Real time </span>
                      event dashboard{' '}
                    </div>
                  </div>
                  <button
                    onClick={() => setCreatedEvent('private')}
                    className="p-5 duration-200 ease-in-out border border-black rounded-xl hover:bg-black hover:text-white"
                  >
                    Create Now
                  </button>
                </div>
                {/* Right card */}
                <div className="flex flex-col items-center justify-evenly border w-[30%] h-[60vh] rounded-3xl border-black">
                  <h1 className="text-xl font-bold">Public</h1>
                  <div className="flex flex-col items-center justify-center gap-7  min-h-[180px]">
                    <div className="text-gray-400">
                      <span className="font-black text-black">One stop </span>
                      admin dashboard
                    </div>
                    <div className="text-gray-400">
                      <span className="font-black text-black">Open </span>
                      Invitations{' '}
                    </div>
                    <div className="text-gray-400">
                      <span className="font-black text-black">Real time </span>
                      event dashboard{' '}
                    </div>
                  </div>
                  <button
                    onClick={() => setCreatedEvent('public')}
                    className="p-5 duration-200 ease-in-out border border-black rounded-xl hover:bg-black hover:text-white"
                  >
                    Create Now
                  </button>
                </div>
              </div>
            </div>
          )}
          {createdEvent != null && (
            <AboutForm setCreatedEvent={setCreatedEvent} />
          )}
        </MainLayout>
      ) : (
        <div>loading...</div>
      )}
    </>
  )
}

export default withApollo(Create, { getDataFromTree })
