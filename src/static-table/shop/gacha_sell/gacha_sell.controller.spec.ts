import { Test, TestingModule } from '@nestjs/testing';
import { GachaSellController } from './gacha_sell.controller';
import { GachaSellService } from './gacha_sell.service';

describe('GachaSellController', () => {
  let controller: GachaSellController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GachaSellController],
      providers: [GachaSellService],
    }).compile();

    controller = module.get<GachaSellController>(GachaSellController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
