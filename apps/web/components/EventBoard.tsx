import { StarIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { formatDate } from '../libs/formatDate'
import { Event } from '../generated/graphql'
import Image from 'next/image'
import { AnnouncementList } from './AnnouncementList'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface EventBoardProps {
  event: Event
}

export const EventBoard: React.FC<EventBoardProps> = ({ event }) => {
  const { title, startDate, location, description } = event
  const { date, time } = formatDate(new Date(startDate))

  //   dummy data for the announcement
  const announcementList = [
    {
      date: '12/22/2022',
      time: '10.12pm',
      content: 'The event is still happening!',
    },
    {
      date: '12/22/2022',
      time: '8.55pm',
      content:
        'Please bring your own fking plate! Bring your own fking umbrella because it might rain!',
    },
    {
      date: '12/22/2022',
      time: '8.55pm',
      content:
        'You can now see who’s coming to the event and who has arrived on event day! track all live announcements made by the organizer! and give up your spot if you have changed plan! and give up your spot if you wish to!',
    },
    {
      date: '12/21/2022',
      time: '8.55pm',
      content:
        'You can now see who’s coming to the event and who has arrived on event day! track all live announcements made by the organizer! and give up your spot if you have changed plan! and give up your spot if you wish to!',
    },
  ]
  return (
    <div className="flex flex-col">
      {/* Category and School */}
      <div className="text-sm text-slate-400">Public Event</div>

      {/* Event Title */}
      <div className="flex justify-between">
        <div className="my-2 text-3xl font-bold">{title}</div>
      </div>

      {/* Organiser details */}
      <div className="flex items-center justify-between gap-5 my-2">
        <div className="flex items-center gap-5 ">
          <Image
            width={50}
            height={50}
            className="hidden rounded-full md:inline"
            src={
              'https://media.licdn.com/dms/image/C5603AQGrADSoKzdbnQ/profile-displayphoto-shrink_400_400/0/1661447582600?e=1678320000&v=beta&t=gxdqoNAv0qZ_blSbIJzzawYfg5cF_mGf2UPmlOHnBgQ'
            }
            alt="Rounded avatar"
          />
          <div className="flex flex-col items-start justify-center ">
            <div className="text-xl font-bold">MySA</div>
            <div className="flex items-center justify-center">
              <div className="text-gray-300 ">4.5</div>
              <StarIcon className="text-yellow-300" width={14} height={14} />
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          {/* Feedback button */}

          <div className="relative p-2 px-3 text-white bg-black border rounded-lg cursor-pointer hover:bg-opacity-70">
            {`Who's arrived?`}
            <span className="absolute top-0 right-0 flex w-3 h-3 translate-x-1 translate-y-[-5px]">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
              <span className="inline-flex w-3 h-3 rounded-full bg-sky-500"></span>
            </span>
          </div>

          {/* Changed my mind button */}
          <div className="p-2 px-3 text-white bg-red-600 border rounded-lg cursor-pointer hover:bg-opacity-70">
            Changed my mind
          </div>
        </div>
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
          {/* Click to navigate to the map.  */}
          <div onClick={() => console.log('direction')}>
            <div className="text-sm">Location</div>
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <div className="text-lg font-bold ">{location}</div>
              <ArrowTopRightOnSquareIcon width={15} />
            </div>
          </div>
        </div>
        <div className="line-clamp-3">{description}</div>
      </div>

      {/* Announcement */}
      <div className="flex flex-col gap-2 p-5 mt-5 border border-gray-300 rounded-lg">
        <div className="text-lg font-bold">Announcements</div>
        <AnnouncementList announcementList={announcementList} />
      </div>

      {/* Announcement */}
      <div className="flex flex-col gap-2 p-5 mt-5 border border-gray-300 rounded-lg">
        <div className="text-lg font-bold">Feedback</div>
      </div>
    </div>
  )
}
