import { Test, TestingModule } from '@nestjs/testing';
import { GachaDrawService } from './gacha_draw.service';

describe('GachaDrawService', () => {
  let service: GachaDrawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GachaDrawService],
    }).compile();

    service = module.get<GachaDrawService>(GachaDrawService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
