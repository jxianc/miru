import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminDashboard } from '../components/AdminDashboard'
import { EventList } from '../components/EventList'
import Navbar from '../components/Navbar'
import { Event, useGetEventsOrganizedQuery } from '../generated/graphql'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'
import { useMe } from '../libs/hooks/use-me'

interface ManageProps {}

const Manage: NextPage<ManageProps> = ({}) => {
  // atom
  const [currUser, setCurrUser] = useAtom(setCurrUserAtom)

  // useState
  const [eventList, setEventList] = useState<Event[]>()
  const [currEventIndex, setCurrEventIndex] = useState(0)

  // router
  const router = useRouter()

  // graphql query
  const [{ data: eventsOrganized, error, fetching }] =
    useGetEventsOrganizedQuery({})

  const { meFetching } = useMe(router, setCurrUser)

  useEffect(() => {
    if (error) {
      // TOOD: handle error here
      console.log(error)
      // router.push('/')
    }

    if (eventsOrganized?.getEventsOrganized) {
      setEventList(
        eventsOrganized.getEventsOrganized.sort((a, b) => {
          const dateA = a.createdAt
          const dateB = b.createdAt
          if (dateA > dateB) {
            return -1
          } else {
            return 1
          }
        }),
      )
    }
  }, [eventsOrganized])

  return (
    <>
      {meFetching ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col h-full px-5 py-5 pb-5 ">
          <Navbar
            name={currUser?.name || `user${currUser?.id}`}
            image={currUser?.image || undefined}
          />
          <div className="relative flex flex-grow">
            <div className="grid min-h-full grid-cols-4 mt-5">
              {fetching ? (
                <div>fetching your events...</div>
              ) : eventList && eventList.length > 0 ? (
                <>
                  {/* Left component */}
                  {/* List of Organized Event */}
                  <div className="col-span-1 pr-5 border-r border-gray-200">
                    <EventList
                      setCurrEventIndex={setCurrEventIndex}
                      currEventIndex={currEventIndex}
                      eventTitle={eventList.map((e, idx) => ({
                        idx,
                        title: e.title,
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
