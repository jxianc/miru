import { Injectable } from '@nestjs/common'
import { userInfo } from 'os'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
