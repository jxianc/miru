import { Module } from '@nestjs/common'
import { FormService } from './form.service'
import { FormResolver } from './form.resolver'
import { PrismaService } from '../prisma.service'
import { EventModule } from '../event/event.module'
import { EventService } from '../event/event.service'

@Module({
  imports: [EventModule],
  providers: [FormResolver, FormService, PrismaService, EventService],
})
export class FormModule {}
