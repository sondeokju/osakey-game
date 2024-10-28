import { Test, TestingModule } from '@nestjs/testing';
import { LogUrlService } from './log_url.service';

describe('LogUrlService', () => {
  let service: LogUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogUrlService],
    }).compile();

    service = module.get<LogUrlService>(LogUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
