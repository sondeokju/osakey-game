import { Test, TestingModule } from '@nestjs/testing';
import { UserItemController } from './user_item.controller';
import { UserItemService } from './user_item.service';

describe('UserItemController', () => {
  let controller: UserItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserItemController],
      providers: [UserItemService],
    }).compile();

    controller = module.get<UserItemController>(UserItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
