import { Injectable } from '@nestjs/common'
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

  async update({
    id,
    title,
    description,
    image,
    location,
    maximumAttendance,
    startDate,
    endDate,
  }: UpdateEventInput): Promise<UpdateEventResponse> {
    try {
      const updatedEvent = await this.prisma.event.update({
        where: {
          id,
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
}
