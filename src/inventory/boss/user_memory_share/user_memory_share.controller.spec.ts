import { Test, TestingModule } from '@nestjs/testing';
import { UserMemoryShareController } from './user_memory_share.controller';
import { UserMemoryShareService } from './user_memory_share.service';

describe('UserMemoryShareController', () => {
  let controller: UserMemoryShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMemoryShareController],
      providers: [UserMemoryShareService],
    }).compile();

    controller = module.get<UserMemoryShareController>(UserMemoryShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
