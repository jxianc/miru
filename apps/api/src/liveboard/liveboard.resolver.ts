import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
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

@Resolver()
export class LiveboardResolver {
  constructor(private readonly liveboardService: LiveboardService) {}

  // create announcement, publish events
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => CreateAnnouncementResponse)
  async createAnnouncement(
    @Args({ name: 'eventId' }) eventId: string,
    @Args({ name: 'createAnnouncementInput' })
    createAnnouncementInput: CreateAnnouncementInput,
  ) {
    // TODO publish events
    return await this.liveboardService.createAnnouncement(
      eventId,
      createAnnouncementInput,
    )
  }

  // update announcement, publish events
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => UpdateAnnouncementResponse)
  async updateAnnouncement(
    @Args({ name: 'eventId' }) eventId: string,
    @Args({ name: 'updateAnnouncementInput' })
    updateAnnouncementInput: UpdateAnnouncementInput,
  ) {
    // TODO publish event
    return await this.liveboardService.updateAnnouncement(
      eventId,
      updateAnnouncementInput,
    )
  }

  // remove announcement, publish events
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => BaseResponse)
  async removeAnnouncement(
    @Args({ name: 'eventId' }) eventId: string,
    @Args({ name: 'announcementId' }) announcementId: number,
  ) {
    // TODO publish event
    return await this.liveboardService.removeAnnouncement(
      eventId,
      announcementId,
    )
  }

  // take attendance, publish events
  @UseGuards(JwtGqlAuthGuard, ParticipantGuard)
  @Mutation(() => BaseResponse)
  async attendEvent(
    @Args({ name: 'eventId' }) eventId: string,
    @CurrentUser() user: User,
  ) {
    // TODO publish event
    return await this.liveboardService.attendEvent(user.id, eventId)
  }

  // quit event, publish events
  @UseGuards(JwtGqlAuthGuard, ParticipantGuard)
  @Mutation(() => BaseResponse)
  async quitEvent(
    @Args({ name: 'eventId' }) eventId: string,
    @CurrentUser() user: User,
  ) {
    // TODO publish event
    return await this.liveboardService.quitEvent(user.id, eventId)
  }

  // get liveboard, subcribe to events
  @UseGuards(JwtGqlAuthGuard, ParticipantAndOrganizerGuard)
  @Query(() => LiveboardResponse)
  async getLiveboard(@Args({ name: 'eventId' }) eventId: string) {
    // TODO subscribe events
    return await this.liveboardService.getLiveboardData(eventId)
  }
}
