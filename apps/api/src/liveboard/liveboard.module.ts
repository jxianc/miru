import { Module } from '@nestjs/common'
import { LiveboardService } from './liveboard.service'
import { LiveboardResolver } from './liveboard.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [LiveboardResolver, LiveboardService, PrismaService],
})
export class LiveboardModule {}
