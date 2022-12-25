import { AuthGuard } from '@nestjs/passport'

// guard for controllers (REST api)
export class JwtAuthGuard extends AuthGuard('jwt') {}
