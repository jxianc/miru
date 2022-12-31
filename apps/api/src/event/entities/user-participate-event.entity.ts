import { Field, ObjectType } from '@nestjs/graphql'
import { Event, User, UserForm } from '@prisma/client'
import { UserForm as UserFormEntity } from '../../form/entities/user-form.entity'
import { Event as EventEntity } from './event.entity'
import { User as UserEntity } from '../../auth/entities/user.entity'

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

  @Field(() => UserEntity)
  user!: User
}
