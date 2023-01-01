import { Injectable } from '@nestjs/common'
import { BaseResponse } from '../base/base.response'
import { PrismaService } from '../prisma.service'
import { CreateAnnouncementInput } from './dto/create-announcement.input'
import { CreateAnnouncementResponse } from './dto/create-announcement.response'
import { LiveboardResponse } from './dto/liveboard.response'
import { UpdateAnnouncementInput } from './dto/update-announcement.input'
import { Liveboard } from './entities/liveboard.entity'

@Injectable()
export class LiveboardService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnnouncement(
    eventId: string,
    createAnnouncementInput: CreateAnnouncementInput,
  ): Promise<CreateAnnouncementResponse> {
    try {
      const announcement = await this.prisma.announcement.create({
        data: {
          eventId,
          ...createAnnouncementInput,
        },
      })
      return {
        success: true,
        announcement,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to create announcement',
      }
    }
  }

  async updateAnnouncement(
    eventId: string,
    { id, ...updateAnnouncementInput }: UpdateAnnouncementInput,
  ): Promise<CreateAnnouncementResponse> {
    try {
      const updatedAnnouncement = await this.prisma.announcement.update({
        where: {
          id_eventId: {
            id,
            eventId,
          },
        },
        data: {
          eventId,
          ...updateAnnouncementInput,
        },
      })
      return {
        success: true,
        announcement: updatedAnnouncement,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to update announcement',
      }
    }
  }

  async removeAnnouncement(
    eventId: string,
    announcementId: number,
  ): Promise<BaseResponse> {
    try {
      await this.prisma.announcement.delete({
        where: {
          id_eventId: {
            id: announcementId,
            eventId,
          },
        },
      })
      return {
        success: true,
      }
    } catch (err) {
      return {
        success: false,
        errMsg: 'failed to remove announcement',
      }
    }
  }

  async attendEvent(userId: string, eventId: string): Promise<BaseResponse> {
    try {
      await this.prisma.userParticipateEvent.update({
        where: {
          eventId_userId: {
            userId,
            eventId,
          },
        },
        data: {
          isArrived: true,
          isArrivedAt: new Date(),
        },
      })
      return {
        success: true,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to attend event',
      }
    }
  }

  async quitEvent(userId: string, eventId: string): Promise<BaseResponse> {
    try {
      await this.prisma.userParticipateEvent.delete({
        where: {
          eventId_userId: {
            userId,
            eventId,
          },
        },
      })
      return {
        success: true,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to quit event',
      }
    }
  }

  async getLiveboardData(eventId: string): Promise<LiveboardResponse> {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        announcements: true,
        participants: true,
      },
    })

    if (!event) {
      return {
        success: false,
        errMsg: 'liveboard is not found',
      }
    }

    return {
      success: true,
      liveboard: {
        event,
        annoucements: event.announcements,
        participants: event.participants,
      },
    }
  }
}
