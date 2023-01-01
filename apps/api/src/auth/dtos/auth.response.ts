import { Field, ObjectType } from '@nestjs/graphql'
import { BaseResponse } from '../../base/base.response'

@ObjectType()
export class AuthResponse extends BaseResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string
}
