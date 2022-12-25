import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google.guard'
import { Request, Response } from 'express'
import { OAuthUser } from './types/oauth-user.type'
import { JwtAuthGuard } from './guards/jwt.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/sign-in')
  googleSignIn(@Res() res) {
    res.status(200).send({ msg: 'logged in' })
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as OAuthUser
    const response = await this.authService.oauthSignIn(user, res)
    res.redirect(process.env.CLIENT_ORIGIN)
    return response
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  authTest(@Req() req) {
    console.log('req user, ', req.user)
    return 'hello world'
  }
}
