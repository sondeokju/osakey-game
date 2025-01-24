import { Test, TestingModule } from '@nestjs/testing';
import { SuitLevelController } from './suit_level.controller';
import { SuitLevelService } from './suit_level.service';

describe('SuitLevelController', () => {
  let controller: SuitLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitLevelController],
      providers: [SuitLevelService],
    }).compile();

    controller = module.get<SuitLevelController>(SuitLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
