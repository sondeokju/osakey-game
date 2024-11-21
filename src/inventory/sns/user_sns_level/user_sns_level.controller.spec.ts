import { Test, TestingModule } from '@nestjs/testing';
import { UserSnsLevelController } from './user_sns_level.controller';
import { UserSnsLevelService } from './user_sns_level.service';

describe('UserSnsLevelController', () => {
  let controller: UserSnsLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSnsLevelController],
      providers: [UserSnsLevelService],
    }).compile();

    controller = module.get<UserSnsLevelController>(UserSnsLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
