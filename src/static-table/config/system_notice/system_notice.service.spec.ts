import { Test, TestingModule } from '@nestjs/testing';
import { SystemNoticeService } from './system_notice.service';

describe('SystemNoticeService', () => {
  let service: SystemNoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemNoticeService],
    }).compile();

    service = module.get<SystemNoticeService>(SystemNoticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
