import { Test, TestingModule } from '@nestjs/testing';
import { UserChallengeController } from './user_challenge.controller';
import { UserChallengeService } from './user_challenge.service';

describe('UserChallengeController', () => {
  let controller: UserChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChallengeController],
      providers: [UserChallengeService],
    }).compile();

    controller = module.get<UserChallengeController>(UserChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
