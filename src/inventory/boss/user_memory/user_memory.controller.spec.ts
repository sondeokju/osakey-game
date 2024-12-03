import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryController } from './user_memory.controller';
import { UserMemoryService } from './user_memory.service';

describe('UserMemoryController', () => {
  let controller: UserMemoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMemoryController],
      providers: [UserMemoryService],
    }).compile();

    controller = module.get<UserMemoryController>(UserMemoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
