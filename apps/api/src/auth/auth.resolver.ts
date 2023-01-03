import { UseGuards } from '@nestjs/common'
import { Context, Mutation, Resolver, Query } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthResponse } from './dtos/auth.response'
import { User as UserEntity } from './entities/user.entity'
import { JwtGqlAuthGuard } from './guards/jwt.guard'
import { User } from '@prisma/client'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  refreshToken(@Context() ctx: any): Promise<AuthResponse> {
    return this.authService.refreshToken(ctx.req, ctx.res)
  }

  @UseGuards(JwtGqlAuthGuard)
  @Query(() => UserEntity)
  me(@Context() ctx: any) {
    return ctx.req.user as User
  }
}
