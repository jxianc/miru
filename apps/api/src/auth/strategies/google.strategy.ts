import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { OAuthUser } from '../types/oauth-user.type'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    })
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    // _done: VerifyCallback,
  ): OAuthUser {
    console.log('profile: ', profile)
    const { displayName, emails, provider, photos, id } = profile
    return {
      id,
      emails,
      provider,
      displayName,
      photos,
    }
  }
}
