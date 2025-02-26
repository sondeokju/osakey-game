import { Test, TestingModule } from '@nestjs/testing';
import { GachaSellService } from './gacha_sell.service';

describe('GachaSellService', () => {
  let service: GachaSellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GachaSellService],
    }).compile();

    service = module.get<GachaSellService>(GachaSellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
