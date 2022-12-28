import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateEventInput {
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
