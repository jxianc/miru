import { Field, ObjectType } from '@nestjs/graphql'
import { Event as EventEntity } from '../../event/entities/event.entity'
import { BaseEntity } from '../../base/base.entity'
import { Event, FormKey } from '@prisma/client'
import { FormKey as FormKeyEntity } from './form-key.entity'

@ObjectType()
export class Form extends BaseEntity {
  @Field(() => EventEntity)
  event!: Event

  @Field(() => [FormKeyEntity], { nullable: true })
  formKeys?: FormKey[]
}
