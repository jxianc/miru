import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [process.env.CLIENT_ORIGIN, 'https://studio.apollographql.com'],
    credentials: true,
  })
  app.use(cookieParser())
  await app.listen(process.env.PORT)
  console.log(
    `[Miru]: Server is currently running at http://localhost:${process.env.PORT}/graphql`,
  )
}
bootstrap()
