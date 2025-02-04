import { Test, TestingModule } from '@nestjs/testing';
import { GachaOutputController } from './gacha_output.controller';
import { GachaOutputService } from './gacha_output.service';

describe('GachaOutputController', () => {
  let controller: GachaOutputController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GachaOutputController],
      providers: [GachaOutputService],
    }).compile();

    controller = module.get<GachaOutputController>(GachaOutputController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
