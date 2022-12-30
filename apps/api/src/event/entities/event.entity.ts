import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Form as FormEntity } from '../../form/entities/form.entity'
import { BaseEntity } from '../../base/base.entity'
import { Form } from '@prisma/client'

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

  @Field(() => FormEntity)
  form!: Form

  // TODO organizers
  // TODO participants
  // TODO announcements
}
