import { Test, TestingModule } from '@nestjs/testing';
import { EduReduceTimeService } from './edu_reduce_time.service';

describe('EduReduceTimeService', () => {
  let service: EduReduceTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EduReduceTimeService],
    }).compile();

    service = module.get<EduReduceTimeService>(EduReduceTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
