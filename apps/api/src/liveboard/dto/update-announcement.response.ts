import { ObjectType } from '@nestjs/graphql'
import { CreateAnnouncementResponse } from './create-announcement.response'

@ObjectType()
export class UpdateAnnouncementResponse extends CreateAnnouncementResponse {}
