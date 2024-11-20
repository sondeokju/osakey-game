import { Test, TestingModule } from '@nestjs/testing';
import { SnsLevelController } from './sns_level.controller';
import { SnsLevelService } from './sns_level.service';

describe('SnsLevelController', () => {
  let controller: SnsLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnsLevelController],
      providers: [SnsLevelService],
    }).compile();

    controller = module.get<SnsLevelController>(SnsLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
