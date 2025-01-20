import { Test, TestingModule } from '@nestjs/testing';
import { UserSuitService } from './user_suit.service';

describe('UserSuitService', () => {
  let service: UserSuitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSuitService],
    }).compile();

    service = module.get<UserSuitService>(UserSuitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
