import { Test, TestingModule } from '@nestjs/testing';
import { UserChallengeExtraService } from './user_challenge_extra.service';

describe('UserChallengeExtraService', () => {
  let service: UserChallengeExtraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChallengeExtraService],
    }).compile();

    service = module.get<UserChallengeExtraService>(UserChallengeExtraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
