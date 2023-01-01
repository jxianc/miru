import { Field, ObjectType } from '@nestjs/graphql'
import { Form, FormValue } from '@prisma/client'
import { FormValue as FormValueEntity } from './form-value.entity'
import { Form as FormEntity } from './form.entity'

@ObjectType()
export class FormKey {
  @Field()
  id!: number

  @Field(() => String)
  label!: string

  @Field(() => FormEntity)
  form!: Form

  @Field(() => [FormValueEntity], { nullable: true })
  formFields?: FormValue[]
}
