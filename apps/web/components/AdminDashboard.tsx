import React from 'react'

type EventDetail = {
  type: string
  school: string
  title: string
  description: string
  date: string
  time: string
  location: string
  signup: number
}

interface AdminDashboardProps {
  eventDetail: EventDetail
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  eventDetail,
}) => {
  return (
    <div className="flex flex-col">
      {/* Category and School */}
      <div className="text-sm text-slate-400">
        {eventDetail.type} Event . {eventDetail.school}
      </div>

      {/* Event Title */}
      <div className="my-2 text-3xl font-bold">{eventDetail.title}</div>
      {/* Event Detail */}
      <div className="flex flex-col gap-5 p-5 mt-2 border border-gray-300 rounded-lg">
        <div className="flex items-center gap-12">
          <div>
            <div className="text-sm">Date</div>
            <div className="text-lg font-bold">{eventDetail.date}</div>
          </div>
          <div>
            <div className="text-sm">Time</div>
            <div className="text-lg font-bold">{eventDetail.time}</div>
          </div>
          <div>
            <div className="text-sm">Location</div>
            <div className="text-lg font-bold ">{eventDetail.location}</div>
          </div>
        </div>
        <div className="line-clamp-3">{eventDetail.description}</div>
        <button className="self-end p-2 text-xs duration-200 ease-in-out border border-gray-300 w-36 rounded-xl hover:bg-black hover:text-white">
          Edit details
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {/* Form */}
        <div className="flex flex-col justify-between p-5 border border-gray-300 rounded-lg md:min-h-[300px]">
          <div>
            <div className="mb-2 text-xl font-bold">Form</div>
            <div>You can view and edit your event form here. </div>
          </div>
          <div className="flex flex-col self-end gap-2">
            <button className="p-2 text-xs duration-200 ease-in-out border border-gray-300 w-36 rounded-xl \">
              Preview
            </button>
            <button className="p-2 text-xs text-white duration-200 ease-in-out bg-black border border-gray-300 w-36 rounded-xl">
              Edit Form
            </button>
          </div>
        </div>
        {/* Live board */}
        <div className="flex flex-col justify-between p-5 border border-gray-300 rounded-lg ">
          <div>
            <div className="mb-2 text-xl font-bold">Live Board</div>
            <div>
              You can make and edit announcement on the live board here.
            </div>
          </div>
          <div className="flex flex-col self-end gap-2">
            <button className="p-2 text-xs duration-200 ease-in-out border border-gray-300 w-36 rounded-xl \">
              Edit Announcement
            </button>
            <button className="p-2 text-xs text-white duration-200 ease-in-out bg-black border border-gray-300 w-36 rounded-xl">
              Make Announcement
            </button>
          </div>
        </div>

        {/* Feedback */}
        <div className="flex flex-col justify-between p-5 border border-gray-300 rounded-lg cursor-pointer">
          <div>
            <div className="mb-2 text-xl font-bold whitespace-nowrap">
              Participants Collections
            </div>
            <div>You can view all the data collected here. </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-xs">Registered Participants</div>
            <div className="text-5xl font-extrabold">{eventDetail.signup}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-5 mt-5 border border-gray-300 rounded-lg cursor-pointer">
        <div>
          <div className="mb-2 text-xl font-bold">Feedback</div>
          <div>You can view all 6 feedback here.</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs">avg. rating</div>
          <div className="text-5xl font-extrabold">3.5</div>
        </div>
      </div>
    </div>
  )
}
