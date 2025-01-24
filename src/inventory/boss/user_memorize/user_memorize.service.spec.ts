import { Test, TestingModule } from '@nestjs/testing';
import { UserMemorizeService } from './user_memorize.service';

describe('UserMemorizeService', () => {
  let service: UserMemorizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMemorizeService],
    }).compile();

    service = module.get<UserMemorizeService>(UserMemorizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
