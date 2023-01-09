import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminDashboard } from '../components/AdminDashboard'
import { EventList } from '../components/EventList'
import Navbar from '../components/Navbar'
import { useMeQuery } from '../generated/graphql'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'

interface ManageProps {}

const Manage: NextPage<ManageProps> = ({}) => {
  // atom
  const [currUser, setCurrUser] = useAtom(setCurrUserAtom)

  // useState
  const [currEvent, setCurrEvent] = useState('second')

  // dummy data
  const dummyData = ['X Event', 'Y event', 'K event', 'X event']
  const dummyEventDetail = {
    type: 'Public',
    school: 'University of Wisconsin-Madison',
    title: 'MySA Spring Kickoff X CNY',
    description:
      'MySA is organizing the Spring Kickoff and CNY at the same time!There will be games and food provided! Come celebrate CNY together!',
    date: 'Dec 12, 2022',
    time: '3pm - 4.30pm',
    location: 'Bascom Hill, Room 18',
    signup: 62,
  }
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

  return (
    <>
      {fetching ? (
        <div>loading...</div>
      ) : (
        <div className="z-10 flex flex-col ">
          <Navbar
            name={currUser?.name || `user${currUser?.id}`}
            image={currUser?.image || undefined}
          />
          <div className="relative flex flex-grow">
            <div className="grid min-h-full grid-cols-4 mt-5">
              {/* Left component */}
              {/* List of Organized Event */}

              <div className="col-span-1 pr-5 border-r border-gray-200">
                {/* Dummy data */}
                <EventList setCurrEvent={setCurrEvent} eventData={dummyData} />
              </div>
              {/* Right component */}
              {/* All details of the event */}
              <div className="col-span-3 pl-5">
                <AdminDashboard eventDetail={dummyEventDetail} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Manage
