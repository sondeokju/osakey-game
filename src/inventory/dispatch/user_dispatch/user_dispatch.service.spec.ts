import { Test, TestingModule } from '@nestjs/testing';
import { UserDispatchService } from './user_dispatch.service';

describe('UserDispatchService', () => {
  let service: UserDispatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDispatchService],
    }).compile();

    service = module.get<UserDispatchService>(UserDispatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
