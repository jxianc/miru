import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import { Response, Request } from 'express'
import { PrismaService } from '../prisma.service'
import { AuthResponse } from './dtos/auth.response'
import { OAuthUser } from './types/oauth-user.type'
import { TokenPayload } from './types/token-payload.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
  }

  signIn(user: User, res: Response) {
    // generate accesstoken and refreshtoken
    const { accessToken, refreshToken } = this.generateToken({
      userId: user.id,
    })

    // hash and update refreshtoken to db
    this.updateRefreshToken(refreshToken, user.id, true)

    // send refreshtoken as cookie, and return accesstoken
    this.sendRefreshToken(refreshToken, res)
    return accessToken
  }

  async oauthSignIn(
    { id, provider: providerName, displayName, emails, photos }: OAuthUser,
    res: Response,
  ) {
    // find user by provider id
    const provider = await this.prisma.provider.findUnique({
      where: {
        providerId_providerName: {
          providerId: id,
          providerName,
        },
      },
      include: {
        user: true,
      },
    })

    // if user exists, update user info then login
    if (provider) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: provider.userId,
        },
        data: {
          name: displayName,
          image: photos
            ? photos.length
              ? photos[0].value
              : undefined
            : undefined,
        },
      })
      const accessToken = this.signIn(updatedUser, res)
      console.log('access token: ', accessToken)
      return {
        success: true,
        accessToken,
      }
    }

    // user not exists at this point
    // check user email, if used, throw error
    if (emails) {
      for (const email of emails) {
        const user = await this.prisma.user.findUnique({
          where: {
            email: email.value,
          },
        })
        if (user) {
          return {
            success: false,
            errMsg: 'email is already been used',
          }
        }
      }
    }

    // no email provided or email is not used
    // create a new user and login
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: displayName,
          image: photos
            ? photos.length
              ? photos[0].value
              : undefined
            : undefined,
          email: emails
            ? emails.length
              ? emails[0].value
              : undefined
            : undefined,
          provider: {
            create: {
              providerId: id,
              providerName,
            },
          },
        },
      })
      const accessToken = this.signIn(newUser, res)
      return {
        success: true,
        accessToken,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to create user',
      }
    }
  }

  async refreshToken(req: Request, res: Response): Promise<AuthResponse> {
    // get refreshtoken from cookie
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_KEY]
    if (!refreshToken) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    // verify refreshtoken
    let tokenPayload: TokenPayload
    try {
      tokenPayload = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      })
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    // find user by userid from refreshtoken's payload
    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenPayload.userId,
      },
    })
    // if refreshtoken not in db, we should ask user to login again
    if (!user || !user.refreshToken) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    // compare refreshtoken between db with cookie
    const tokenIsValid = await compare(refreshToken, user.refreshToken)
    if (!tokenIsValid) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    // generate new pair of accesstoken and refreshtoken
    const { accessToken, refreshToken: newRefreshToken } = this.generateToken({
      userId: user.id,
    })

    // update new refreshtoken to db
    this.updateRefreshToken(newRefreshToken, tokenPayload.userId, true)

    // return acesstoken and send refreshtoken as cookie
    this.sendRefreshToken(newRefreshToken, res)
    return {
      success: true,
      accessToken,
    }
  }

  async updateRefreshToken(
    refreshToken: string,
    userId: string,
    requireHash: boolean,
  ) {
    let hashedRefreshToken = refreshToken
    if (requireHash) {
      hashedRefreshToken = await hash(refreshToken, 11)
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    })
  }

  generateToken(tokenPayload: TokenPayload) {
    console.log('token secret', process.env.ACCESS_TOKEN_SECRET)
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    })
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  // send refreshtoken cookie
  sendRefreshToken(refreshToken: string, res: Response) {
    res.cookie(process.env.REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: true,
    })
  }
}
