import { Field, ObjectType } from '@nestjs/graphql'
import { Event } from '@prisma/client'
import { BaseResponse } from '../../base/base.response'
import { Event as EventEntity } from '../entities/event.entity'

@ObjectType()
export class CreateEventResponse extends BaseResponse {
  @Field(() => EventEntity)
  event?: Event
}
