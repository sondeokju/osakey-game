import { Test, TestingModule } from '@nestjs/testing';
import { UserSuitController } from './user_suit.controller';
import { UserSuitService } from './user_suit.service';

describe('UserSuitController', () => {
  let controller: UserSuitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSuitController],
      providers: [UserSuitService],
    }).compile();

    controller = module.get<UserSuitController>(UserSuitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
