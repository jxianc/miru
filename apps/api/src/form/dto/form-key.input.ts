import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class CreateFormKeyInput {
  @Field()
  label!: string
}

@InputType()
export class UpdateFormKeyInput extends PartialType(CreateFormKeyInput) {
  @Field()
  id!: string
}
