import {
  createUnionType,
  Field,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Announcement } from '@prisma/client'
import { Announcement as AnnouncementEntity } from '../entities/announcement.entity'

/**
 * two types of payload
 *  - for announcments
 *    - create/update announcement -> return announcement entity
 *    - remove announcment -> announcement id
 *  - for participants
 *    - attend -> return userId
 *    - quit -> return userId
 */

export enum AnnouncementAction {
  CREATE,
  UPDATE,
}
registerEnumType(AnnouncementAction, {
  name: 'AnnouncementAction',
})

@ObjectType()
export class AnnouncementUpdated {
  @Field(() => AnnouncementAction)
  action!: AnnouncementAction

  @Field(() => AnnouncementEntity)
  announcement!: Announcement
}

@ObjectType()
export class AnnouncementRemoved {
  @Field(() => Int)
  announcementId!: number
}

export enum ParticipantStatus {
  ATTEND,
  QUIT,
}

registerEnumType(ParticipantStatus, {
  name: 'ParticipantStatus',
})

@ObjectType()
export class ParticipantUpdated {
  @Field()
  userId!: string

  @Field(() => ParticipantStatus)
  status!: ParticipantStatus
}

export const Payload = createUnionType({
  name: 'Payload',
  types: () =>
    [AnnouncementUpdated, AnnouncementRemoved, ParticipantUpdated] as const,
  resolveType(value) {
    if (value.action) {
      return AnnouncementUpdated
    } else if (value.announcementId) {
      return AnnouncementRemoved
    } else if (value.userId) {
      return ParticipantUpdated
    } else {
      return null
    }
  },
})

@ObjectType()
export class LiveboardPayload {
  @Field()
  eventId!: string

  @Field(() => Payload)
  payload!: typeof Payload
}
