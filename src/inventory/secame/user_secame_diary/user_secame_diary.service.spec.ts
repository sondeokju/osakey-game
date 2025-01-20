import { Test, TestingModule } from '@nestjs/testing';
import { UserSecameDiaryService } from './user_secame_diary.service';

describe('UserSecameDiaryService', () => {
  let service: UserSecameDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSecameDiaryService],
    }).compile();

    service = module.get<UserSecameDiaryService>(UserSecameDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
