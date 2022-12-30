import { Field, ObjectType } from '@nestjs/graphql'
import { Event, UserForm } from '@prisma/client'
import { UserForm as UserFormEntity } from '../../form/entities/user-form.entity'
import { Event as EventEntity } from './event.entity'

@ObjectType()
export class UserParticipateEvent {
  @Field()
  isArrived!: boolean

  @Field(() => String, { nullable: true })
  feedback?: string

  @Field()
  rating!: number

  @Field(() => EventEntity)
  event!: Event

  @Field(() => UserFormEntity)
  userForm!: UserForm

  // TODO user
}
