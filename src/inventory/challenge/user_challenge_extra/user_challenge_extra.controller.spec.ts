import { Test, TestingModule } from '@nestjs/testing';
import { UserChallengeExtraController } from './user_challenge_extra.controller';
import { UserChallengeExtraService } from './user_challenge_extra.service';

describe('UserChallengeExtraController', () => {
  let controller: UserChallengeExtraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChallengeExtraController],
      providers: [UserChallengeExtraService],
    }).compile();

    controller = module.get<UserChallengeExtraController>(UserChallengeExtraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
