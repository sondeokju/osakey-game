import { Test, TestingModule } from '@nestjs/testing';
import { GachaOutputService } from './gacha_output.service';

describe('GachaOutputService', () => {
  let service: GachaOutputService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GachaOutputService],
    }).compile();

    service = module.get<GachaOutputService>(GachaOutputService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
