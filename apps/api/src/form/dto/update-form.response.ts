import { Field, ObjectType } from '@nestjs/graphql'
import { Form } from '@prisma/client'
import { BaseResponse } from '../../base/base.response'
import { Form as FormEntity } from '../entities/form.entity'

@ObjectType()
export class UpdateFormResponse extends BaseResponse {
  @Field(() => FormEntity, { nullable: true })
  form?: Form
}
