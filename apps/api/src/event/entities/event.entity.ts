import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Form as FormEntity } from '../../form/entities/form.entity'
import { BaseEntity } from '../../base/base.entity'
import { Form, User, UserParticipateEvent } from '@prisma/client'
import { User as UserEntity } from 'src/auth/entities/user.entity'
import { UserParticipateEvent as UserParticipateEventEntity } from './user-participate-event.entity'

@ObjectType()
export class Event extends BaseEntity {
  @Field(() => String)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String)
  description!: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String)
  location!: string

  @Field(() => Int, { nullable: true })
  maximumAttendance?: number

  @Field(() => Date)
  startDate!: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date

  @Field(() => FormEntity)
  form!: Form

  @Field(() => [UserEntity], { nullable: true })
  organizers?: User[]

  @Field(() => [UserParticipateEventEntity], { nullable: true })
  participants?: UserParticipateEvent[]

  // TODO announcements
}
