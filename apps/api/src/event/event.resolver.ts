import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { EventService } from './event.service'
import { Event } from './entities/event.entity'
import { CreateEventInput } from './dto/create-event.input'
import { UpdateEventInput } from './dto/update-event.input'
import { UseGuards } from '@nestjs/common'

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  // find events by event id

  // find all events by organizers

  @Mutation(() => Event)
  createEvent(
    @Args({ name: 'createEventInput' }) createEventInput: CreateEventInput,
  ) {
    return this.eventService.create(createEventInput, [''])
  }

  // update event
  @Mutation(() => Event)
  updateEvent(
    @Args({ name: 'updateEventInput' }) updateEventInput: UpdateEventInput,
  ) {
    return this.eventService.update(updateEventInput)
  }

  // remove event
  @Mutation(() => Event)
  removeEvent(@Args({ name: 'eventId' }) eventId: string) {
    return this.eventService.remove(eventId)
  }

  // add organizer into event
}
