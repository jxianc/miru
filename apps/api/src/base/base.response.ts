import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseResponse {
  @Field(() => String, { nullable: true })
  errMsg?: string

  @Field()
  success!: boolean
}
