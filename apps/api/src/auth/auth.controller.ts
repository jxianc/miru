import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google.guard'
import { Request, Response } from 'express'
import { OAuthUser } from './types/oauth-user.type'
import { JwtAuthGuard } from './guards/jwt.guard'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from '@prisma/client'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/sign-in')
  googleSignIn(@Res() res: Response) {
    res.status(200).send({ msg: 'logged in' })
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as OAuthUser
    const response = await this.authService.oauthSignIn(user, res)
    // console.log('user: ', user)
    // console.log('access token: ', response.accessToken)
    res.redirect(process.env.CLIENT_ORIGIN)
    return response
  }

  @Post('refresh_token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const response = await this.authService.refreshToken(req, res)
    res.send(response)
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign_out')
  signOut(@CurrentUser() user: User, @Res() res: Response) {
    this.authService.signOut(res, user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  authTest() {
    return 'hello world'
  }
}
