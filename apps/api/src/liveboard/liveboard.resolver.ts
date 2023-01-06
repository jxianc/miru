import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { BaseResponse } from '../base/base.response'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { OrganizerGuard } from '../auth/guards/organizer.guard'
import { CreateAnnouncementInput } from './dto/create-announcement.input'
import { CreateAnnouncementResponse } from './dto/create-announcement.response'
import { UpdateAnnouncementInput } from './dto/update-announcement.input'
import { UpdateAnnouncementResponse } from './dto/update-announcement.response'
import { LiveboardService } from './liveboard.service'
import { ParticipantGuard } from '../auth/guards/participant.guard'
import { LiveboardResponse } from './dto/liveboard.response'
import { ParticipantAndOrganizerGuard } from '../auth/guards/participant-and-organizer.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { User } from '@prisma/client'
import { PubSubEngine } from 'graphql-subscriptions'
import {
  AnnouncementAction,
  LiveboardPayload,
  ParticipantStatus,
} from './dto/liveboard.payload'

const LIVEBOARD_UPDATED = 'liveboardUpdated'

@Resolver()
export class LiveboardResolver {
  constructor(
    private readonly liveboardService: LiveboardService,
    @Inject('PUB_SUB') private pubsub: PubSubEngine,
  ) {}

  // create announcement, publish events
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => CreateAnnouncementResponse)
  async createAnnouncement(
    @Args({ name: 'eventId' }) eventId: string,
    @Args({ name: 'createAnnouncementInput' })
    createAnnouncementInput: CreateAnnouncementInput,
  ) {
    const response = await this.liveboardService.createAnnouncement(
      eventId,
      createAnnouncementInput,
    )

    if (response.success && response.announcement) {
      // publish new created announcement
      const payload: LiveboardPayload = {
        eventId,
        payload: {
          action: AnnouncementAction.CREATE,
          announcement: response.announcement,
        },
      }

      this.pubsub.publish(LIVEBOARD_UPDATED, {
        liveboardUpdated: payload,
      })
    }

    return response
  }

  // update announcement, publish events
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => UpdateAnnouncementResponse)
  async updateAnnouncement(
    @Args({ name: 'eventId' }) eventId: string,
    @Args({ name: 'updateAnnouncementInput' })
    updateAnnouncementInput: UpdateAnnouncementInput,
  ) {
    const response = await this.liveboardService.updateAnnouncement(
      eventId,
      updateAnnouncementInput,
    )

    if (response.success && response.announcement) {
      // publish new updated announcement
      const payload: LiveboardPayload = {
        eventId,
        payload: {
          action: AnnouncementAction.UPDATE,
          announcement: response.announcement,
        },
      }

      console.log('publishing', payload)
      this.pubsub.publish(LIVEBOARD_UPDATED, {
        liveboardUpdated: payload,
      })
    }

    return response
  }

  // remove announcement, publish events
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => BaseResponse)
  async removeAnnouncement(
    @Args({ name: 'eventId' }) eventId: string,
    @Args({ name: 'announcementId' }) announcementId: number,
  ) {
    const response = await this.liveboardService.removeAnnouncement(
      eventId,
      announcementId,
    )

    if (response.success) {
      // publish new removed announcement
      const payload: LiveboardPayload = {
        eventId,
        payload: {
          announcementId,
        },
      }

      this.pubsub.publish(LIVEBOARD_UPDATED, {
        liveboardUpdated: payload,
      })
    }

    return response
  }

  // take attendance, publish events
  @UseGuards(JwtGqlAuthGuard, ParticipantGuard)
  @Mutation(() => BaseResponse)
  async attendEvent(
    @Args({ name: 'eventId' }) eventId: string,
    @CurrentUser() user: User,
  ) {
    const response = await this.liveboardService.attendEvent(user.id, eventId)

    if (response.success) {
      // publish new attended participant
      const payload: LiveboardPayload = {
        eventId,
        payload: {
          userId: user.id,
          status: ParticipantStatus.ATTEND,
        },
      }

      this.pubsub.publish(LIVEBOARD_UPDATED, {
        liveboardUpdated: payload,
      })
    }

    return response
  }

  // quit event, publish events
  @UseGuards(JwtGqlAuthGuard, ParticipantGuard)
  @Mutation(() => BaseResponse)
  async quitEvent(
    @Args({ name: 'eventId' }) eventId: string,
    @CurrentUser() user: User,
  ) {
    const response = await this.liveboardService.quitEvent(user.id, eventId)

    if (response.success) {
      // publish quit participant
      const payload: LiveboardPayload = {
        eventId,
        payload: {
          userId: user.id,
          status: ParticipantStatus.QUIT,
        },
      }

      this.pubsub.publish(LIVEBOARD_UPDATED, {
        liveboardUpdated: payload,
      })
    }

    return response
  }

  // get liveboard
  @UseGuards(JwtGqlAuthGuard, ParticipantAndOrganizerGuard)
  @Query(() => LiveboardResponse)
  async getLiveboard(@Args({ name: 'eventId' }) eventId: string) {
    return await this.liveboardService.getLiveboardData(eventId)
  }

  @UseGuards(JwtGqlAuthGuard, ParticipantAndOrganizerGuard)
  @Subscription(() => LiveboardPayload, {
    name: 'liveboardUpdated',
    filter: (payload, variables) => {
      return payload.liveboardUpdated.eventId === variables.eventId
    },
  })
  subscribeToLiveboardUpdated(@Args({ name: 'eventId' }) eventId: string) {
    return this.pubsub.asyncIterator(LIVEBOARD_UPDATED)
  }
}
