import { Field, ObjectType } from '@nestjs/graphql'
import { Event } from '@prisma/client'
import { Event as EventEntity } from '../../event/entities/event.entity'
import { BaseEntity } from '../../base/base.entity'

@ObjectType()
export class Announcement extends BaseEntity {
  @Field()
  id!: number

  @Field()
  title!: string

  @Field()
  description!: string

  @Field()
  type!: string

  @Field(() => EventEntity)
  event!: Event
}
