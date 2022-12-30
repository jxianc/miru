import { Resolver } from '@nestjs/graphql'
import { FormService } from './form.service'

@Resolver()
export class FormResolver {
  constructor(private readonly formService: FormService) {}

  // update/customize the form
  // TODO updateForm

  // get the form with event info
  // TODO getForm

  // submit the form
  // TODO submit form
}
