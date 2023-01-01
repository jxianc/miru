import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BaseResponse } from '../base/base.response'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { CreateEventInput } from './dto/create-event.input'
import { CreateEventResponse } from './dto/create-event.response'
import { UpdateEventInput } from './dto/update-event.input'
import { UpdateEventResponse } from './dto/update-event.response'
import { Event } from './entities/event.entity'
import { EventService } from './event.service'
import { OrganizerGuard } from '../auth/guards/organizer.guard'

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  // find events by event id
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Query(() => Event)
  getEvent(@Args({ name: 'eventId' }) eventId: string) {
    return this.eventService.findEventByEventId(eventId)
  }

  // find all events by organizer
  @UseGuards(JwtGqlAuthGuard)
  @Query(() => [Event])
  getEventsOrganized(@Context() ctx: any) {
    return this.eventService.findEventsByOrganizerId(ctx.req.user.id)
  }

  // find all events by participant
  @UseGuards(JwtGqlAuthGuard)
  @Query(() => [Event])
  getEventsParticipated(@Context() ctx: any) {
    return this.eventService.findEventsByParticipantId(ctx.req.user.id)
  }

  // create event
  @UseGuards(JwtGqlAuthGuard)
  @Mutation(() => CreateEventResponse)
  createEvent(
    @Args({ name: 'createEventInput' }) createEventInput: CreateEventInput,
    @Context() ctx: any,
  ) {
    // TODO add organizers parameter to add mulitple organizers when creating event
    return this.eventService.create(createEventInput, [
      ctx.req.user.id as string,
    ])
  }

  // update event
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => UpdateEventResponse)
  updateEvent(
    @Args({ name: 'updateEventInput' }) updateEventInput: UpdateEventInput,
    @Args({ name: 'eventId' }) eventId: string,
  ) {
    return this.eventService.update(updateEventInput, eventId)
  }

  // remove event
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => BaseResponse)
  removeEvent(@Args({ name: 'eventId' }) eventId: string) {
    return this.eventService.remove(eventId)
  }

  // add organizer into event
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => UpdateEventResponse)
  addOrganizers(
    @Args({ name: 'organizerIds', type: () => [String] })
    organizerIds: [string],
    @Args({ name: 'eventId' }) eventId: string,
  ) {
    return this.eventService.connectOrganizers(organizerIds, eventId)
  }
}
