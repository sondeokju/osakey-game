import { Test, TestingModule } from '@nestjs/testing';
import { UserCollectionController } from './user_collection.controller';
import { UserCollectionService } from './user_collection.service';

describe('UserCollectionController', () => {
  let controller: UserCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCollectionController],
      providers: [UserCollectionService],
    }).compile();

    controller = module.get<UserCollectionController>(UserCollectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
