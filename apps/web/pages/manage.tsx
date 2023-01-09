import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminDashboard } from '../components/AdminDashboard'
import { EventList } from '../components/EventList'
import Navbar from '../components/Navbar'
import {
  Event,
  useGetEventsOrganizedQuery,
  useMeQuery,
} from '../generated/graphql'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'

interface ManageProps {}

const Manage: NextPage<ManageProps> = ({}) => {
  // atom
  const [currUser, _setCurrUser] = useAtom(setCurrUserAtom)

  // useState
  const [eventList, setEventList] = useState<Event[]>()
  const [currEventIndex, setCurrEventIndex] = useState(0)

  // router
  const router = useRouter()

  // graphql query
  const [{ data: meData, fetching }] = useMeQuery()
  const [{ data: eventsOrganized, error }] = useGetEventsOrganizedQuery({})

  useEffect(() => {
    if (!meData?.me) {
      router.push('/')
    }

    if (error) {
      // TOOD: handle error here
      router.push('/')
    }

    if (eventsOrganized?.getEventsOrganized) {
      setEventList(eventsOrganized.getEventsOrganized)
    }
  }, [meData, eventsOrganized])

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
              {eventList && eventList.length > 0 ? (
                <>
                  {/* Left component */}
                  {/* List of Organized Event */}
                  <div className="col-span-1 pr-5 border-r border-gray-200">
                    <EventList
                      setCurrEventIndex={setCurrEventIndex}
                      eventTitle={eventList.map((e, idx) => ({
                        idx,
                        title: e.title,
                        createdAt: e.createdAt,
                      }))}
                    />
                  </div>
                  {/* Right component */}
                  {/* All details of the event */}
                  <div className="col-span-3 pl-5">
                    <AdminDashboard event={eventList[currEventIndex]} />
                  </div>
                </>
              ) : (
                <>
                  <div>currently no events</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Manage
