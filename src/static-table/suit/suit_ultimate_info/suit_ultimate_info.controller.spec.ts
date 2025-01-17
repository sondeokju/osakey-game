import { Test, TestingModule } from '@nestjs/testing';
import { SuitUltimateInfoController } from './suit_ultimate_info.controller';
import { SuitUltimateInfoService } from './suit_ultimate_info.service';

describe('SuitUltimateInfoController', () => {
  let controller: SuitUltimateInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitUltimateInfoController],
      providers: [SuitUltimateInfoService],
    }).compile();

    controller = module.get<SuitUltimateInfoController>(SuitUltimateInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
