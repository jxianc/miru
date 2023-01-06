import { Module } from '@nestjs/common'
import { LiveboardService } from './liveboard.service'
import { LiveboardResolver } from './liveboard.resolver'
import { PrismaService } from '../prisma.service'
import { EventService } from '../event/event.service'
import { PubSub } from 'graphql-subscriptions'

@Module({
  providers: [
    LiveboardResolver,
    LiveboardService,
    PrismaService,
    EventService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class LiveboardModule {}
