import { Test, TestingModule } from '@nestjs/testing';
import { UserShopLimitService } from './user_shop_limit.service';

describe('UserShopLimitService', () => {
  let service: UserShopLimitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserShopLimitService],
    }).compile();

    service = module.get<UserShopLimitService>(UserShopLimitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
