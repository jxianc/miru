import { Field, ObjectType } from '@nestjs/graphql'
import { FormField, UserParticipateEvent } from '@prisma/client'
import { UserParticipateEvent as UserParticipateEventEntity } from '../../event/entities/user-participate-event.entity'
import { BaseEntity } from '../../base/base.entity'
import { FormField as FormFieldEntity } from './form-field.entity'

@ObjectType()
export class UserForm extends BaseEntity {
  @Field(() => UserParticipateEventEntity)
  userParticipateEvent!: UserParticipateEvent

  @Field(() => [FormFieldEntity], { nullable: true })
  formFields?: FormField[]
}
