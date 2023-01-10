import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Event } from '../generated/graphql'
import { formatDate } from '../libs/formatDate'

interface AdminDashboardProps {
  event: Event
}

const onDeleteEvent = () => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full h-full min-h-[100px] bg-white shadow-lg rounded-lg pointer-events-auto flex `}
      >
        <div className="items-center flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-1 ml-3">
              <p className="text-xl font-medium text-gray-900 ">
                Are you sure?
              </p>
              <p className="mt-1 text-gray-500">All data will be DELETED.</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex items-center justify-center w-full p-4 text-sm font-medium text-red-400 border border-transparent rounded-none rounded-r-lg hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Delete!
          </button>
        </div>
      </div>
    ),
    { position: 'top-right' },
  )
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ event }) => {
  const { title, startDate, location, description } = event
  const { date, time } = formatDate(new Date(startDate))
  const [toDelete, setToDelete] = useState(false)
  return (
    <div className="flex flex-col">
      {/* Category and School */}
      <div className="text-sm text-slate-400">Public Event</div>

      {/* Event Title */}
      <div className="flex justify-between">
        <div className="my-2 text-3xl font-bold">{title}</div>
        <button
          onClick={() => onDeleteEvent()}
          className="grid px-3 my-1 text-white bg-red-600 border rounded-lg place-content-center hover:opacity-90"
        >
          <div className="flex items-center justify-center gap-2">
            <div>Delete event</div>
            <TrashIcon width={20} height={20} />
          </div>
        </button>
      </div>
      {/* Event Detail */}
      <div className="flex flex-col gap-5 p-5 mt-2 border border-gray-300 rounded-lg">
        <div className="flex items-center gap-12">
          <div>
            <div className="text-sm">Date</div>
            <div className="text-lg font-bold">{date}</div>
          </div>
          <div>
            <div className="text-sm">Time</div>
            <div className="text-lg font-bold">{time}</div>
          </div>
          <div>
            <div className="text-sm">Location</div>
            <div className="text-lg font-bold ">{location}</div>
          </div>
        </div>
        <div className="line-clamp-3">{description}</div>
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
            <div className="mb-2 text-xl font-bold xl:whitespace-nowrap">
              Participants Collections
            </div>
            <div>You can view all the data collected here. </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-xs">Registered Participants</div>
            <div className="text-5xl font-extrabold">69</div>
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
