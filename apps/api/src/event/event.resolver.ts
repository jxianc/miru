import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
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

  // find all events by organizer

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
  ) {
    return this.eventService.update(updateEventInput)
  }

  // remove event
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => Event)
  removeEvent(@Args({ name: 'eventId' }) eventId: string) {
    return this.eventService.remove(eventId)
  }

  // add organizer into event
}
