import { Field, ObjectType } from '@nestjs/graphql'
import { Form, FormField } from '@prisma/client'
import { FormField as FormFieldEntity } from './form-field.entity'
import { Form as FormEntity } from './form.entity'

@ObjectType()
export class FormKey {
  @Field()
  id!: number

  @Field(() => String)
  label!: string

  @Field(() => FormEntity)
  form!: Form

  @Field(() => [FormFieldEntity], { nullable: true })
  formFields?: FormField[]
}
