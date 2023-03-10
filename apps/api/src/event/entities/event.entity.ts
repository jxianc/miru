import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Form as FormEntity } from '../../form/entities/form.entity'
import { BaseEntity } from '../../base/base.entity'
import { Announcement, Form, User, UserParticipateEvent } from '@prisma/client'
import { User as UserEntity } from 'src/auth/entities/user.entity'
import { UserParticipateEvent as UserParticipateEventEntity } from './user-participate-event.entity'
import { Announcement as AnnouncementEntity } from '../../liveboard/entities/announcement.entity'

@ObjectType()
export class Event extends BaseEntity {
  @Field(() => String)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String)
  description!: string

  @Field(() => String, { nullable: true })
  image?: string | null

  @Field(() => String)
  location!: string

  @Field(() => Int, { nullable: true })
  maximumAttendance?: number | null

  @Field(() => Date)
  startDate!: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date | null

  @Field(() => FormEntity, { nullable: true })
  form?: Form

  @Field(() => [UserEntity], { nullable: true })
  organizers?: User[]

  @Field(() => [UserParticipateEventEntity], { nullable: true })
  participants?: UserParticipateEvent[]

  @Field(() => Int, { nullable: true })
  participantsCount?: number | null

  @Field(() => Int, { nullable: true })
  averageRating?: number | null

  @Field(() => Int, { nullable: true })
  feedbacksCount?: number | null

  @Field(() => [AnnouncementEntity], { nullable: true })
  announcements?: Announcement[]
}
