import { Test, TestingModule } from '@nestjs/testing';
import { UserItemExchangeService } from './user_item_exchange.service';

describe('UserItemExchangeService', () => {
  let service: UserItemExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserItemExchangeService],
    }).compile();

    service = module.get<UserItemExchangeService>(UserItemExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
