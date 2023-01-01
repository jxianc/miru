import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseEntity {
  @Field(() => Date)
  createdAt!: Date

  @Field(() => Date)
  updatedAt!: Date
}
