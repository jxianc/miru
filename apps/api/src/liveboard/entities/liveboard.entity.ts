import { Field, ObjectType } from '@nestjs/graphql'
import { Announcement, Event, User, UserParticipateEvent } from '@prisma/client'
import { UserParticipateEvent as UserParticipateEventEntity } from 'src/event/entities/user-participate-event.entity'
import { User as UserEntity } from '../../auth/entities/user.entity'
import { Event as EventEntity } from '../../event/entities/event.entity'
import { Announcement as AnnouncementEntity } from './announcement.entity'

@ObjectType()
export class Liveboard {
  @Field(() => EventEntity)
  event!: Event

  @Field(() => [AnnouncementEntity], { nullable: true })
  annoucements?: Announcement[]

  @Field(() => [UserParticipateEventEntity], { nullable: true })
  participants?: UserParticipateEvent[]
}
