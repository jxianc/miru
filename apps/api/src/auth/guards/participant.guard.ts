import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { EventService } from '../../event/event.service'

// NOTE make sure the resolvers using this guard provide `eventId` as argument
@Injectable()
export class ParticipantGuard implements CanActivate {
  constructor(private readonly eventService: EventService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().req.user as User

    const { eventId } = ctx.getArgs()
    if (eventId) {
      const participant = await this.eventService.findParticipantsByEvent(
        eventId,
        user.id,
      )
      if (participant) {
        return true
      }
    }

    throw new UnauthorizedException(
      'you are not authorized to access this event',
    )
  }
}
