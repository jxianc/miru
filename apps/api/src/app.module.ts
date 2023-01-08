import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppResolver } from './app.resolver'
import { EventModule } from './event/event.module'
import { FormModule } from './form/form.module'
import { LiveboardModule } from './liveboard/liveboard.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: (context) => {
        if (context?.extra?.request) {
          // for graphql subscription and websocket
          return {
            req: {
              ...context?.extra?.request,
              headers: {
                ...context?.extra?.request?.headers,
                authorization: context?.connectionParams.Authorization,
              },
            },
          }
        }
        return { req: context?.req, res: context?.res }
      }, // attach request and response to graphql context
      cors: {
        origin: [process.env.CLIENT_ORIGIN, 'https://studio.apollographql.com'],
        credentials: true,
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    AuthModule,
    EventModule,
    FormModule,
    LiveboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
