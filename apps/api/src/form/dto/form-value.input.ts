import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FormValueInput {
  @Field()
  formKeyId!: number

  @Field()
  value!: string
}
