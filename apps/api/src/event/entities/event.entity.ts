import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BaseEntity } from '../../base/base.entity'

@ObjectType()
export class Event extends BaseEntity {
  @Field(() => String)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String)
  description!: string

  @Field(() => String, { nullable: true })
  image?: string

  @Field(() => String)
  location!: string

  @Field(() => Int, { nullable: true })
  maximumAttendance?: number

  @Field(() => Date)
  startDate!: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date
}
