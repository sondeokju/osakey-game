import { Test, TestingModule } from '@nestjs/testing';
import { PassLevelController } from './pass_level.controller';
import { PassLevelService } from './pass_level.service';

describe('PassLevelController', () => {
  let controller: PassLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassLevelController],
      providers: [PassLevelService],
    }).compile();

    controller = module.get<PassLevelController>(PassLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
