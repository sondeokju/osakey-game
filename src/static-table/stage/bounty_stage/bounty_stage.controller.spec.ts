import { Test, TestingModule } from '@nestjs/testing';
import { BountyStageController } from './bounty_stage.controller';
import { BountyStageService } from './bounty_stage.service';

describe('BountyStageController', () => {
  let controller: BountyStageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BountyStageController],
      providers: [BountyStageService],
    }).compile();

    controller = module.get<BountyStageController>(BountyStageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
