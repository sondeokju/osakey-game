import { Test, TestingModule } from '@nestjs/testing';
import { SuitInfoController } from './suit_info.controller';
import { SuitInfoService } from './suit_info.service';

describe('SuitInfoController', () => {
  let controller: SuitInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitInfoController],
      providers: [SuitInfoService],
    }).compile();

    controller = module.get<SuitInfoController>(SuitInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
