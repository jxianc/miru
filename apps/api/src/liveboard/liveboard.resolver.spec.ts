import { Test, TestingModule } from '@nestjs/testing'
import { LiveboardResolver } from './liveboard.resolver'
import { LiveboardService } from './liveboard.service'

describe('LiveboardResolver', () => {
  let resolver: LiveboardResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveboardResolver, LiveboardService],
    }).compile()

    resolver = module.get<LiveboardResolver>(LiveboardResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
