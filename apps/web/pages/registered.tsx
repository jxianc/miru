import { getDataFromTree } from '@apollo/react-ssr'
import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { EventBoard } from '../components/EventBoard'
import { EventList } from '../components/EventList'
import Navbar from '../components/Navbar'
import { Event, useGetEventsOrganizedQuery } from '../generated/graphql'
import { MainLayout } from '../layouts/MainLayout'
import withApollo from '../libs/apollo/with-apollo'
import { setCurrUserAtom } from '../libs/atom/current-user.atom'
import { useAuth } from '../libs/hooks/use-auth'
interface RegisteredProps {}

const Registered: NextPage<RegisteredProps> = ({}) => {
  // atom
  const [currUser, setCurrUser] = useAtom(setCurrUserAtom)

  // useState
  const [eventList, setEventList] = useState<Event[]>()
  const [currEventIndex, setCurrEventIndex] = useState(0)

  // router
  const router = useRouter()

  // graphql query
  // TODO: getEventsRegistered
  const {
    data: eventsOrganized,
    loading,
    error,
  } = useGetEventsOrganizedQuery({})

  const { meFetching } = useAuth(router, setCurrUser)

  useEffect(() => {
    if (error) {
      // TOOD: handle error here
      router.push('/')
    }

    // TODO: getEventsRegistered
    if (eventsOrganized?.getEventsOrganized) {
      setEventList(eventsOrganized.getEventsOrganized)
    }
  }, [eventsOrganized])

  return (
    <>
      {meFetching ? (
        <div>loading...</div>
      ) : (
        <MainLayout>
          <Navbar
            name={currUser?.name || `user${currUser?.id}`}
            image={currUser?.image || undefined}
          />
          <div className="relative flex flex-grow">
            <div className="grid min-w-full min-h-full grid-cols-4 mt-5">
              {loading ? (
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
        </MainLayout>
      )}
    </>
  )
}

export default withApollo(Registered, { getDataFromTree })
