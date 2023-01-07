import {
  createUnionType,
  Field,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import { Announcement } from '@prisma/client'
import { Announcement as AnnouncementEntity } from '../entities/announcement.entity'

@ObjectType()
class LiveboardPayload {
  @Field()
  eventId!: string

  @Field(() => Payload)
  payload!: typeof Payload
}

const Payload = createUnionType({
  name: 'Payload',
  types: () =>
    [AnnouncementUpdated, AnnouncementRemoved, ParticipantUpdated] as const,
  resolveType(value) {
    if (value.action) {
      return AnnouncementUpdated
    }
    if (value.announcementId) {
      return AnnouncementRemoved
    }
    if (value.userId) {
      return ParticipantUpdated
    }
    return null
  },
})

enum AnnouncementAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}
registerEnumType(AnnouncementAction, {
  name: 'AnnouncementAction',
})

@ObjectType()
class AnnouncementUpdated {
  @Field(() => AnnouncementAction, { name: 'announcementAction' })
  action!: AnnouncementAction

  @Field(() => AnnouncementEntity)
  announcement!: Announcement
}

@ObjectType()
class AnnouncementRemoved {
  @Field(() => Int)
  announcementId!: number
}

enum ParticipantAction {
  ATTEND = 'ATTEND',
  QUIT = 'QUIT',
}
registerEnumType(ParticipantAction, {
  name: 'ParticipantAction',
})

@ObjectType()
class ParticipantUpdated {
  @Field()
  userId!: string

  @Field(() => ParticipantAction, { name: 'participantAction' })
  action!: ParticipantAction
}

export { LiveboardPayload, AnnouncementAction, ParticipantAction }
