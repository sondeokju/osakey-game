import { Test, TestingModule } from '@nestjs/testing';
import { UserItemExchangeController } from './user_item_exchange.controller';
import { UserItemExchangeService } from './user_item_exchange.service';

describe('UserItemExchangeController', () => {
  let controller: UserItemExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserItemExchangeController],
      providers: [UserItemExchangeService],
    }).compile();

    controller = module.get<UserItemExchangeController>(UserItemExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
