import React from 'react'

interface EventListProps {
  setCurrEvent: Function
  eventData: Array<String>
}

export const EventList: React.FC<EventListProps> = ({
  setCurrEvent,
  eventData,
}) => {
  return (
    <>
      {eventData.map((x) => (
        <div className="p-5 mb-5 duration-200 ease-in-out border border-gray-300 cursor-pointer rounded-xl hover:bg-black hover:text-white">
          {x}
        </div>
      ))}
    </>
  )
}
