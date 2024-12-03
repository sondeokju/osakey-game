import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryRentController } from './user_memory_rent.controller';
import { UserMemoryRentService } from './user_memory_rent.service';

describe('UserMemoryRentController', () => {
  let controller: UserMemoryRentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMemoryRentController],
      providers: [UserMemoryRentService],
    }).compile();

    controller = module.get<UserMemoryRentController>(UserMemoryRentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
