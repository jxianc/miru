import { Injectable, NotFoundException } from '@nestjs/common'
import { BaseResponse } from '../base/base.response'
import { PrismaService } from '../prisma.service'
import { CreateEventInput } from './dto/create-event.input'
import { CreateEventResponse } from './dto/create-event.response'
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
    })

    if (!event) {
      throw new NotFoundException('event is not found')
    }

    return event
  }

  async findEventsByOrganizerId(organizerId: string) {
    // since this is called with auth guard
    // the user with the id is guaranteed exists
    const userWithEventOrganized = await this.prisma.user.findUnique({
      where: {
        id: organizerId,
      },
      include: {
        eventOrganized: true,
      },
    })

    // return empty array instead of undefined
    return userWithEventOrganized?.eventOrganized || []
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
