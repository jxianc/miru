import { ObjectType } from '@nestjs/graphql'
import { CreateEventResponse } from './create-event.response'

@ObjectType()
export class UpdateEventResponse extends CreateEventResponse {}
