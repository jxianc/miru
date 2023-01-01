import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAnnouncementInput {
  @Field()
  title!: string

  @Field()
  description!: string

  @Field()
  type!: string
}
