import { Test, TestingModule } from '@nestjs/testing';
import { UserShopLimitController } from './user_shop_limit.controller';
import { UserShopLimitService } from './user_shop_limit.service';

describe('UserShopLimitController', () => {
  let controller: UserShopLimitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserShopLimitController],
      providers: [UserShopLimitService],
    }).compile();

    controller = module.get<UserShopLimitController>(UserShopLimitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
