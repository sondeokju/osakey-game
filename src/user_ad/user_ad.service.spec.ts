import { Test, TestingModule } from '@nestjs/testing';
import { UserAdService } from './user_ad.service';

describe('UserAdService', () => {
  let service: UserAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAdService],
    }).compile();

    service = module.get<UserAdService>(UserAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
