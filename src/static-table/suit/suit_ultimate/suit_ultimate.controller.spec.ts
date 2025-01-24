import { Test, TestingModule } from '@nestjs/testing';
import { SuitUltimateController } from './suit_ultimate.controller';
import { SuitUltimateService } from './suit_ultimate.service';

describe('SuitUltimateController', () => {
  let controller: SuitUltimateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitUltimateController],
      providers: [SuitUltimateService],
    }).compile();

    controller = module.get<SuitUltimateController>(SuitUltimateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
