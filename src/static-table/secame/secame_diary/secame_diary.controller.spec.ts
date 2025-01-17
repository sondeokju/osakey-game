import { Test, TestingModule } from '@nestjs/testing';
import { SecameDiaryController } from './secame_diary.controller';
import { SecameDiaryService } from './secame_diary.service';

describe('SecameDiaryController', () => {
  let controller: SecameDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecameDiaryController],
      providers: [SecameDiaryService],
    }).compile();

    controller = module.get<SecameDiaryController>(SecameDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
