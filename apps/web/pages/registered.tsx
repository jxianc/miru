import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { EventBoard } from '../components/EventBoard'
import { EventList } from '../components/EventList'
import Navbar from '../components/Navbar'
import {
  Event,
  useGetEventsOrganizedQuery,
  useMeQuery,
} from '../generated/graphql'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'
interface RegisteredProps {}

const Registered: NextPage<RegisteredProps> = ({}) => {
  // atom
  const [currUser, _setCurrUser] = useAtom(setCurrUserAtom)

  // useState
  const [eventList, setEventList] = useState<Event[]>()
  const [currEventIndex, setCurrEventIndex] = useState(0)

  // router
  const router = useRouter()

  // graphql query
  const [{ data: meData, fetching }] = useMeQuery()

  // TODO: getEventsRegistered
  const [{ data: eventsOrganized, error }] = useGetEventsOrganizedQuery({})

  useEffect(() => {
    if (!meData?.me) {
      router.push('/')
    }

    if (error) {
      // TOOD: handle error here
      router.push('/')
    }

    // TODO: getEventsRegistered
    if (eventsOrganized?.getEventsOrganized) {
      setEventList(
        eventsOrganized.getEventsOrganized.sort((a, b) => {
          const dateA = a.createdAt
          const dateB = b.createdAt
          if (dateA > dateB) {
            return -1
          }
          if (dateA < dateB) {
            return 1
          }
        }),
      )
    }
  }, [meData, eventsOrganized])

  return (
    <>
      {fetching ? (
        <div>loading...</div>
      ) : (
        <div className="flex flex-col h-full pb-5">
          <Navbar
            name={currUser?.name || `user${currUser?.id}`}
            image={currUser?.image || undefined}
          />
          <div className="relative flex flex-grow">
            <div className="grid min-w-full min-h-full grid-cols-4 mt-5">
              {eventList && eventList.length > 0 ? (
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
                    <EventBoard event={eventList[currEventIndex]} />
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

export default Registered
