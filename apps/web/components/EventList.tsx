import React, { Dispatch, SetStateAction } from 'react'

interface EventTitle {
  title: string
  idx: number
}

interface EventListProps {
  setCurrEventIndex: Dispatch<SetStateAction<number>>
  currEventIndex: Number
  eventTitle: Array<EventTitle>
}

export const EventList: React.FC<EventListProps> = ({
  setCurrEventIndex,
  currEventIndex,
  eventTitle,
}) => {
  return (
    <>
      {eventTitle.map((e, i) => (
        <div
          key={e.idx}
          className={`${
            currEventIndex == i && `bg-black text-white`
          } p-5 mb-5 duration-200 ease-in-out border border-gray-300 cursor-pointer rounded-xl hover:bg-black hover:text-white`}
          onClick={() => setCurrEventIndex(e.idx)}
        >
          {e.title}
        </div>
      ))}
    </>
  )
}
