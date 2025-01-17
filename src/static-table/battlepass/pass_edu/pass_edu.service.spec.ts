import { Test, TestingModule } from '@nestjs/testing';
import { PassEduService } from './pass_edu.service';

describe('PassEduService', () => {
  let service: PassEduService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassEduService],
    }).compile();

    service = module.get<PassEduService>(PassEduService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
