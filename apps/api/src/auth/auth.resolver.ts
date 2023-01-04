import { UseGuards } from '@nestjs/common'
import { Context, Mutation, Resolver, Query } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthResponse } from './dtos/auth.response'
import { User as UserEntity } from './entities/user.entity'
import { JwtGqlAuthGuard } from './guards/jwt.guard'
import { User } from '@prisma/client'
import { CurrentUser } from './decorators/current-user.decorator'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  refreshToken(@Context() ctx: any): Promise<AuthResponse> {
    return this.authService.refreshToken(ctx.req, ctx.res)
  }

  @UseGuards(JwtGqlAuthGuard)
  @Query(() => UserEntity)
  me(@CurrentUser() user: User) {
    return user
  }
}
