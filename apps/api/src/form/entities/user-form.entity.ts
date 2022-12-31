import { Field, ObjectType } from '@nestjs/graphql'
import { FormValue, UserParticipateEvent } from '@prisma/client'
import { UserParticipateEvent as UserParticipateEventEntity } from '../../event/entities/user-participate-event.entity'
import { BaseEntity } from '../../base/base.entity'
import { FormValue as FormValueEntity } from './form-field.entity'

@ObjectType()
export class UserForm extends BaseEntity {
  @Field(() => UserParticipateEventEntity)
  userParticipateEvent!: UserParticipateEvent

  @Field(() => [FormValueEntity], { nullable: true })
  formValues?: FormValue[]
}
