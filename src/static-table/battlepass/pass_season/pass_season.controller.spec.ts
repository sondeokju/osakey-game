import { Test, TestingModule } from '@nestjs/testing';
import { PassSeasonController } from './pass_season.controller';
import { PassSeasonService } from './pass_season.service';

describe('PassSeasonController', () => {
  let controller: PassSeasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassSeasonController],
      providers: [PassSeasonService],
    }).compile();

    controller = module.get<PassSeasonController>(PassSeasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
