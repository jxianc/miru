import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

// guard for controllers (REST api)
export class JwtAuthGuard extends AuthGuard('jwt') {}

// guard for graphql resolver
export class JwtGqlAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    return request
  }
}
