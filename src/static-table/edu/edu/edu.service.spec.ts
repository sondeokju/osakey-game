import { Test, TestingModule } from '@nestjs/testing';
import { EduService } from './edu.service';

describe('EduService', () => {
  let service: EduService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EduService],
    }).compile();

    service = module.get<EduService>(EduService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
