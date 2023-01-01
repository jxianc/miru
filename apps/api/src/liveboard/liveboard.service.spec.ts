import { Test, TestingModule } from '@nestjs/testing'
import { LiveboardService } from './liveboard.service'

describe('LiveboardService', () => {
  let service: LiveboardService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveboardService],
    }).compile()

    service = module.get<LiveboardService>(LiveboardService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
