import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryRentService } from './user_memory_rent.service';

describe('UserMemoryRentService', () => {
  let service: UserMemoryRentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMemoryRentService],
    }).compile();

    service = module.get<UserMemoryRentService>(UserMemoryRentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
