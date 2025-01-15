import { Test, TestingModule } from '@nestjs/testing';
import { UserIngameLogService } from './user_ingame_log.service';

describe('UserIngameLogService', () => {
  let service: UserIngameLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserIngameLogService],
    }).compile();

    service = module.get<UserIngameLogService>(UserIngameLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
