import { Test, TestingModule } from '@nestjs/testing';
import { SecameDiaryService } from './secame_diary.service';

describe('SecameDiaryService', () => {
  let service: SecameDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecameDiaryService],
    }).compile();

    service = module.get<SecameDiaryService>(SecameDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
