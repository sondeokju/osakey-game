import { Test, TestingModule } from '@nestjs/testing';
import { AccountLevelService } from './account_level.service';

describe('AccountLevelService', () => {
  let service: AccountLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountLevelService],
    }).compile();

    service = module.get<AccountLevelService>(AccountLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
