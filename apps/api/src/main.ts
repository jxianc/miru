import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT)
  console.log(
    `[Miru]: Server is currently running at http://localhost:${process.env.PORT}/graphql`,
  )
}
bootstrap()
