import { Test, TestingModule } from '@nestjs/testing';
import { UserSecameDiaryController } from './user_secame_diary.controller';
import { UserSecameDiaryService } from './user_secame_diary.service';

describe('UserSecameDiaryController', () => {
  let controller: UserSecameDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSecameDiaryController],
      providers: [UserSecameDiaryService],
    }).compile();

    controller = module.get<UserSecameDiaryController>(UserSecameDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
