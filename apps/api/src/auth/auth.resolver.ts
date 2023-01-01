import { Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthResponse } from './dtos/auth.response'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  refreshToken(@Context() ctx: any): Promise<AuthResponse> {
    return this.authService.refreshToken(ctx.req, ctx.res)
  }
}
