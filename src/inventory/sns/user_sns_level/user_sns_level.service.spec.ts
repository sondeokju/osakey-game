import { Test, TestingModule } from '@nestjs/testing';
import { UserSnsLevelService } from './user_sns_level.service';

describe('UserSnsLevelService', () => {
  let service: UserSnsLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSnsLevelService],
    }).compile();

    service = module.get<UserSnsLevelService>(UserSnsLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
