import { Field, ObjectType } from '@nestjs/graphql'
import { Announcement } from '@prisma/client'
import { BaseResponse } from '../../base/base.response'
import { Announcement as AnnouncementEntity } from '../entities/announcement.entity'

@ObjectType()
export class CreateAnnouncementResponse extends BaseResponse {
  @Field(() => AnnouncementEntity, { nullable: true })
  announcement?: Announcement
}
