import { Test, TestingModule } from '@nestjs/testing';
import { GachaDrawController } from './gacha_draw.controller';
import { GachaDrawService } from './gacha_draw.service';

describe('GachaDrawController', () => {
  let controller: GachaDrawController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GachaDrawController],
      providers: [GachaDrawService],
    }).compile();

    controller = module.get<GachaDrawController>(GachaDrawController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
