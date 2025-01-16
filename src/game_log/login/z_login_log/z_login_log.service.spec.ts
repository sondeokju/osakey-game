import { Test, TestingModule } from '@nestjs/testing';
import { ZLoginLogService } from './z_login_log.service';

describe('ZLoginLogService', () => {
  let service: ZLoginLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZLoginLogService],
    }).compile();

    service = module.get<ZLoginLogService>(ZLoginLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
