import { Test, TestingModule } from '@nestjs/testing';
import { ItemExchangeService } from './item_exchange.service';

describe('ItemExchangeService', () => {
  let service: ItemExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemExchangeService],
    }).compile();

    service = module.get<ItemExchangeService>(ItemExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
