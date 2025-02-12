import { Test, TestingModule } from '@nestjs/testing';
import { UserDiamondService } from './user_diamond.service';

describe('UserDiamondService', () => {
  let service: UserDiamondService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDiamondService],
    }).compile();

    service = module.get<UserDiamondService>(UserDiamondService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
