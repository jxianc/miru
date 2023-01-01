import { Module } from '@nestjs/common'
import { LiveboardService } from './liveboard.service'
import { LiveboardResolver } from './liveboard.resolver'
import { PrismaService } from '../prisma.service'
import { EventService } from '../event/event.service'

@Module({
  providers: [LiveboardResolver, LiveboardService, PrismaService, EventService],
})
export class LiveboardModule {}
