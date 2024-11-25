import { Test, TestingModule } from '@nestjs/testing';
import { DispatchConfigService } from './dispatch_config.service';

describe('DispatchConfigService', () => {
  let service: DispatchConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchConfigService],
    }).compile();

    service = module.get<DispatchConfigService>(DispatchConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
