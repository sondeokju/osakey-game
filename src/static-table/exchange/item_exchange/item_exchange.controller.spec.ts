import { Test, TestingModule } from '@nestjs/testing';
import { ItemExchangeController } from './item_exchange.controller';
import { ItemExchangeService } from './item_exchange.service';

describe('ItemExchangeController', () => {
  let controller: ItemExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemExchangeController],
      providers: [ItemExchangeService],
    }).compile();

    controller = module.get<ItemExchangeController>(ItemExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
