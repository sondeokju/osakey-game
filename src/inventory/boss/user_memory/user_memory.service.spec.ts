import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryService } from './user_memory.service';

describe('UserMemoryService', () => {
  let service: UserMemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMemoryService],
    }).compile();

    service = module.get<UserMemoryService>(UserMemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
