import { Field, ObjectType } from '@nestjs/graphql'
import { Event } from '@prisma/client'
import { BaseEntity } from '../../base/base.entity'
import { Event as EventEntity } from '../../event/entities/event.entity'

@ObjectType()
export class User extends BaseEntity {
  @Field()
  id!: number

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String, { nullable: true })
  refreshToken?: string

  @Field(() => EventEntity, { nullable: true })
  eventOrganized?: Event[]

  @Field(() => EventEntity, { nullable: true })
  eventParticipated?: Event[]
}
