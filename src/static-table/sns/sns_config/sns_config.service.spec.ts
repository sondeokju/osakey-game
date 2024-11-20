import { Test, TestingModule } from '@nestjs/testing';
import { SnsConfigService } from './sns_config.service';

describe('SnsConfigService', () => {
  let service: SnsConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnsConfigService],
    }).compile();

    service = module.get<SnsConfigService>(SnsConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
