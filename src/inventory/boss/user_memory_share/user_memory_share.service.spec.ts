import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryShareService } from './user_memory_share.service';

describe('UserMemoryShareService', () => {
  let service: UserMemoryShareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMemoryShareService],
    }).compile();

    service = module.get<UserMemoryShareService>(UserMemoryShareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
