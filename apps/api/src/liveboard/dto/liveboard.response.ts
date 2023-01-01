import { Field, ObjectType } from '@nestjs/graphql'
import { BaseResponse } from '../../base/base.response'
import { Liveboard } from '../entities/liveboard.entity'

@ObjectType()
export class LiveboardResponse extends BaseResponse {
  @Field(() => Liveboard, { nullable: true })
  liveboard?: Liveboard
}
