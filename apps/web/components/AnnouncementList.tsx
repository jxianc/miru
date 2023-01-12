import React, { useState } from 'react'

interface Announcement {
  date: string
  time: string
  content: string
}

interface AnnouncementListProps {
  announcementList: Array<Announcement> | []
}

export const AnnouncementList: React.FC<AnnouncementListProps> = ({
  announcementList,
}) => {
  const [itemToShow, setItemToShow] = useState(3)
  const [showItem, setShowItem] = useState(false)

  return announcementList?.length == 0 ? (
    <div>No announcement was made by the organiser.</div>
  ) : (
    <div className="flex flex-col gap-4">
      {announcementList.slice(0, itemToShow).map((x) => (
        <div className="flex flex-col gap-1">
          {/* Date & Time */}
          <div className="flex items-center justify-start gap-5 font-bold">
            <div>{x.date}</div>
            <div>{x.time}</div>
          </div>

          {/* Content */}
          <div>{x.content}</div>
        </div>
      ))}
      {announcementList?.length > 3 && !showItem ? (
        <div
          onClick={() => {
            setItemToShow(announcementList?.length)
            setShowItem(!showItem)
          }}
          className="cursor-pointer"
        >
          Show older announcement...
        </div>
      ) : (
        <div
          onClick={() => {
            setItemToShow(3)
            setShowItem(!showItem)
          }}
          className="cursor-pointer"
        >
          Hide announcement...
        </div>
      )}
    </div>
  )
}
