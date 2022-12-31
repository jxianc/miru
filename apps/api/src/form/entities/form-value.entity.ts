import { Field, ObjectType } from '@nestjs/graphql'
import { FormKey, UserForm } from '@prisma/client'
import { FormKey as FormKeyEntity } from './form-key.entity'
import { UserForm as UserFormEntity } from './user-form.entity'

@ObjectType()
export class FormValue {
  @Field()
  value!: string

  @Field(() => FormKeyEntity)
  formKey!: FormKey

  @Field(() => UserFormEntity)
  userForm!: UserForm
}
