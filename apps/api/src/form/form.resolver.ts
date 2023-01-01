import { UseGuards } from '@nestjs/common'
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { OrganizerGuard } from '../auth/guards/organizer.guard'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { BaseResponse } from '../base/base.response'
import { CreateFormKeyInput, UpdateFormKeyInput } from './dto/form-key.input'
import { FormValueInput } from './dto/form-value.input'
import { UpdateFormResponse } from './dto/update-form.response'
import { Form as FormEntity } from './entities/form.entity'
import { FormService } from './form.service'

@Resolver()
export class FormResolver {
  constructor(private readonly formService: FormService) {}

  // update/customize the form
  @UseGuards(JwtGqlAuthGuard, OrganizerGuard)
  @Mutation(() => UpdateFormResponse)
  async updateForm(
    @Args({ name: 'eventId' }) eventId: string,
    @Args({
      name: 'createFormKeyInputs',
      type: () => [CreateFormKeyInput],
      nullable: true,
    })
    createFormKeyInputs?: CreateFormKeyInput[],
    @Args({
      name: 'updateFormKeyInputs',
      type: () => [UpdateFormKeyInput],
      nullable: true,
    })
    updateFormKeyInputs?: UpdateFormKeyInput[],
    @Args({ name: 'removeFormKeyInputs', type: () => [Int], nullable: true })
    removeFormKeyInputs?: number[],
  ): Promise<UpdateFormResponse> {
    if (createFormKeyInputs) {
      const { success: createSuccess, errMsg: createErrMsg } =
        await this.formService.createFormKeys(eventId, createFormKeyInputs)
      if (!createSuccess) {
        return {
          success: false,
          errMsg: createErrMsg,
        }
      }
    }

    if (updateFormKeyInputs) {
      const { success: updateSuccess, errMsg: updateErrMsg } =
        await this.formService.updateFormKeys(eventId, updateFormKeyInputs)
      if (!updateSuccess) {
        return {
          success: false,
          errMsg: updateErrMsg,
        }
      }
    }

    if (removeFormKeyInputs) {
      const { success: removeSuccess, errMsg: removeErrMsg } =
        await this.formService.removeFormKeys(eventId, removeFormKeyInputs)
      if (!removeSuccess) {
        return {
          success: false,
          errMsg: removeErrMsg,
        }
      }
    }

    // all operations are excuted successfully, get the updated form
    const updatedForm = await this.formService.findFormByEvent(eventId)
    return {
      success: true,
      form: updatedForm!, // the form sure exists
    }
  }

  // get the form with event info
  // TODO does this need to add guards?
  @Query(() => FormEntity)
  async getForm(@Args({ name: 'eventId' }) eventId: string) {
    return await this.formService.findFormByEvent(eventId)
  }

  // submit the form
  @UseGuards(JwtGqlAuthGuard)
  @Mutation(() => BaseResponse)
  async signUpEvent(
    @Args({ name: 'eventId' }) eventId: string,
    @Args({ name: 'formValueInputs', type: () => [FormValueInput] })
    formValueInputs: FormValueInput[],
    @Context() ctx: any,
  ) {
    return await this.formService.signUpEvent(
      ctx.req.user.id as string,
      eventId,
      formValueInputs,
    )
  }
}
