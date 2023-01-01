import { Injectable } from '@nestjs/common'
import { BaseResponse } from '../base/base.response'
import { PrismaService } from '../prisma.service'
import { CreateFormKeyInput, UpdateFormKeyInput } from './dto/form-key.input'
import { FormValueInput } from './dto/form-value.input'

@Injectable()
export class FormService {
  constructor(private readonly prisma: PrismaService) {}

  async findFormByEvent(eventId: string) {
    const form = await this.prisma.form.findUnique({
      where: {
        eventId,
      },
      include: {
        event: true,
        formKeys: true,
      },
    })

    return form
  }

  async createFormKeys(
    eventId: string,
    createFormKeyInputs: CreateFormKeyInput[],
  ): Promise<BaseResponse> {
    try {
      const { count } = await this.prisma.formKey.createMany({
        data: createFormKeyInputs.map((input) => {
          return {
            eventId,
            ...input,
          }
        }),
      })
      return {
        success: createFormKeyInputs.length === count,
        errMsg:
          createFormKeyInputs.length === count
            ? undefined
            : 'error occurred when creating form keys',
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'error occurred when creating form keys',
      }
    }
  }

  async updateFormKeys(
    eventId: string,
    updateFormKeyInputs: UpdateFormKeyInput[],
  ): Promise<BaseResponse> {
    let successCount = 0
    try {
      for (const input of updateFormKeyInputs) {
        const updatedFormKey = await this.prisma.formKey.update({
          where: {
            id_eventId: {
              id: input.id,
              eventId,
            },
          },
          data: {
            label: input.label,
          },
        })

        if (updatedFormKey) {
          successCount++
        }
      }
      return {
        success: updateFormKeyInputs.length === successCount,
        errMsg:
          updateFormKeyInputs.length === successCount
            ? undefined
            : 'error occurred when updating form keys',
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'error occurred when updating form keys',
      }
    }
  }

  async removeFormKeys(
    eventId: string,
    removeFormKeyInputs: number[],
  ): Promise<BaseResponse> {
    let successCount = 0
    try {
      for (const input of removeFormKeyInputs) {
        await this.prisma.formKey.delete({
          where: {
            id_eventId: {
              id: input,
              eventId,
            },
          },
        })
        successCount++
      }
      return {
        success: successCount === removeFormKeyInputs.length,
        errMsg:
          successCount === removeFormKeyInputs.length
            ? undefined
            : 'error occurred when removing form keys',
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'error occurred when removing form keys',
      }
    }
  }

  async signUpEvent(
    userId: string,
    eventId: string,
    formValueInputs: FormValueInput[],
  ): Promise<BaseResponse> {
    const userParticipateEvent =
      await this.prisma.userParticipateEvent.findUnique({
        where: {
          eventId_userId: {
            eventId,
            userId,
          },
        },
      })

    if (userParticipateEvent) {
      return {
        success: false,
        errMsg: 'user has signed up for this event',
      }
    }

    try {
      const userParticipateEvent =
        await this.prisma.userParticipateEvent.create({
          data: {
            userId,
            eventId,
            userForm: {
              create: {
                formValues: {
                  createMany: {
                    data: formValueInputs,
                  },
                },
              },
            },
          },
          include: {
            userForm: {
              include: {
                formValues: true,
              },
            },
          },
        })
      if (
        userParticipateEvent.userForm?.formValues.length ===
        formValueInputs.length
      ) {
        return {
          success: true,
        }
      } else {
        return {
          success: false,
          errMsg: 'failed to sign up event',
        }
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to sign up event',
      }
    }
  }
}
