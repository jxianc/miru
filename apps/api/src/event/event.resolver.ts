import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { CreateEventInput } from './dto/create-event.input'
import { UpdateEventInput } from './dto/update-event.input'
import { Event } from './entities/event.entity'
import { EventService } from './event.service'
import { OrganizerGuard } from './guards/organizer.guard'

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  // find events by event id
  @Query(() => Event)
  getEvent(@Args({ name: 'eventId' }) eventId: string) {
    return this.eventService.findEventByEventId(eventId)
  }

  // find all events by organizer
  @UseGuards(JwtGqlAuthGuard)
  @Query(() => [Event])
  getEvents(@Context() ctx: any) {
    return this.eventService.findEventsByOrganizerId(ctx.user.id)
  }

  @UseGuards(JwtGqlAuthGuard)
  @Mutation(() => Event)
  createEvent(
    @Args({ name: 'createEventInput' }) createEventInput: CreateEventInput,
    @Context() ctx: any,
  ) {
    // TODO add organizers parameter to add mulitple organizers when creating event
    return this.eventService.create(createEventInput, [
      ctx.req.userId as string,
    ])
  }

  // update event
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => Event)
  updateEvent(
    @Args({ name: 'updateEventInput' }) updateEventInput: UpdateEventInput,
    @Args({ name: 'eventId' }) eventId: string,
  ) {
    return this.eventService.update(updateEventInput, eventId)
  }

  // remove event
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => Event)
  removeEvent(@Args({ name: 'eventId' }) eventId: string) {
    return this.eventService.remove(eventId)
  }

  // add organizer into event
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => Event)
  addOrganizers(
    @Args({ name: 'organizerIds', type: () => [String] })
    organizerIds: [string],
    @Args({ name: 'eventId' }) eventId: string,
  ) {
    return this.eventService.connectOrganizers(organizerIds, eventId)
  }
}
