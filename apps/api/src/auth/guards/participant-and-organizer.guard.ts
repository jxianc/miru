import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { PrismaService } from '../../prisma.service'

// NOTE make sure the resolvers using this guard provide `eventId` as argument
@Injectable()
export class ParticipantAndOrganizerGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().req.user as User

    const { eventId } = ctx.getArgs()
    if (eventId) {
      const userPartipateEvent =
        await this.prismaService.userParticipateEvent.findUnique({
          where: {
            eventId_userId: {
              eventId,
              userId: user.id,
            },
          },
        })

      if (userPartipateEvent) {
        return true
      }
    }

    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        organizers: true,
      },
    })
    if (!event) {
      throw new NotFoundException('event is not found')
    }

    for (const org of event.organizers) {
      if (org.id === user.id) {
        return true
      }
    }

    throw new UnauthorizedException(
      'you are not authorized to access this event',
    )
  }
}
