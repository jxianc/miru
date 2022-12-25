import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { TokenPayload } from '../types/token-payload.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    })
  }

  async validate(verifiedPayload: TokenPayload) {
    console.log('payload', verifiedPayload)
    // attach user in request
    const user = await this.authService.getUserById(verifiedPayload.userId)
    console.log(user)
    return user
  }
}
