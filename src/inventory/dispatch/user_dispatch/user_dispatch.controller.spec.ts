import { Test, TestingModule } from '@nestjs/testing';
import { UserDispatchController } from './user_dispatch.controller';
import { UserDispatchService } from './user_dispatch.service';

describe('UserDispatchController', () => {
  let controller: UserDispatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDispatchController],
      providers: [UserDispatchService],
    }).compile();

    controller = module.get<UserDispatchController>(UserDispatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
