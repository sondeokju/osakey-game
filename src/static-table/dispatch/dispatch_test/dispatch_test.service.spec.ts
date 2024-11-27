import { Test, TestingModule } from '@nestjs/testing';
import { DispatchTestService } from './dispatch_test.service';

describe('DispatchTestService', () => {
  let service: DispatchTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchTestService],
    }).compile();

    service = module.get<DispatchTestService>(DispatchTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
