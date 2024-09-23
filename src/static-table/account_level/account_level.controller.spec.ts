import { Test, TestingModule } from '@nestjs/testing';
import { AccountLevelController } from './account_level.controller';
import { AccountLevelService } from './account_level.service';

describe('AccountLevelController', () => {
  let controller: AccountLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountLevelController],
      providers: [AccountLevelService],
    }).compile();

    controller = module.get<AccountLevelController>(AccountLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
