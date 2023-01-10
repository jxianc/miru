import { Injectable, NotFoundException } from '@nestjs/common'
import { BaseResponse } from '../base/base.response'
import { PrismaService } from '../prisma.service'
import { CreateEventInput } from './dto/create-event.input'
import { CreateEventResponse } from './dto/create-event.response'
import { Event } from './entities/event.entity'
import { UpdateEventInput } from './dto/update-event.input'
import { UpdateEventResponse } from './dto/update-event.response'

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    {
      title,
      description,
      image,
      location,
      maximumAttendance,
      startDate,
      endDate,
    }: CreateEventInput,
    organizerIds: [string],
  ): Promise<CreateEventResponse> {
    try {
      const event = await this.prisma.event.create({
        data: {
          title,
          description,
          image,
          location,
          maximumAttendance,
          startDate,
          endDate,
          organizers: {
            connect: organizerIds.map((oid) => ({ id: oid })),
          },
          form: {
            create: {
              formKeys: {
                create: {
                  label: 'Name',
                },
              },
            },
          },
        },
        include: {
          organizers: true,
          form: {
            include: {
              formKeys: true,
            },
          },
        },
      })
      return {
        success: true,
        event,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to create event',
      }
    }
  }

  async update(
    {
      title,
      description,
      image,
      location,
      maximumAttendance,
      startDate,
      endDate,
    }: UpdateEventInput,
    eventId: string,
  ): Promise<UpdateEventResponse> {
    try {
      const updatedEvent = await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          title,
          description,
          image,
          location,
          maximumAttendance,
          startDate,
          endDate,
        },
      })
      return {
        success: true,
        event: updatedEvent,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to update event',
      }
    }
  }

  async remove(eventId: string): Promise<BaseResponse> {
    await this.prisma.event.delete({
      where: {
        id: eventId,
      },
    })

    return {
      success: true,
    }
  }

  async findEventByEventId(eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        announcements: true,
        form: {
          include: {
            formKeys: true,
          },
        },
        organizers: true,
        participants: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!event) {
      throw new NotFoundException('event is not found')
    }

    return event
  }

  async findEventsByOrganizerId(organizerId: string): Promise<Event[]> {
    // since this is called with auth guard
    // the user with the id is guaranteed exists
    const userWithEventOrganized = await this.prisma.user.findUnique({
      where: {
        id: organizerId,
      },
      include: {
        eventOrganized: {
          include: {
            _count: {
              select: {
                participants: true,
              },
            },
          },
        },
      },
    })

    // return empty array instead of undefined
    return (
      userWithEventOrganized?.eventOrganized.map((e) => {
        return {
          ...e,
          participantsCount: e._count.participants,
        }
      }) || []
    )
  }

  async findEventsByParticipantId(participantId: string) {
    const userWithEventParticipated = await this.prisma.user.findUnique({
      where: {
        id: participantId,
      },
      include: {
        eventParticapted: true,
      },
    })
    return userWithEventParticipated?.eventParticapted || []
  }

  async findOrganizerByEvent(eventId: string, organizerId: string) {
    const eventWithOrganizers = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        organizers: true,
      },
    })

    if (eventWithOrganizers) {
      for (const org of eventWithOrganizers.organizers) {
        if (org.id === organizerId) {
          return org
        }
      }
    }

    return null
  }

  async findParticipantsByEvent(eventId: string, participantId: string) {
    return await this.prisma.userParticipateEvent.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId: participantId,
        },
      },
    })
  }

  async connectOrganizers(
    organizerIds: [string],
    eventId: string,
  ): Promise<UpdateEventResponse> {
    if (!this.verifyOrganizers(organizerIds)) {
      return {
        success: false,
        errMsg: 'failed to add organizers',
      }
    }

    try {
      const updatedEvent = await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          organizers: {
            connect: organizerIds.map((oid) => ({ id: oid })),
          },
        },
      })

      return {
        success: true,
        event: updatedEvent,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to add organizers',
      }
    }
  }

  verifyOrganizers(organizerIds: [string]) {
    const organizers = organizerIds.map(async (oid) => {
      return await this.prisma.user.findUnique({
        where: {
          id: oid,
        },
      })
    })

    return organizers.length === organizerIds.length
  }
}
