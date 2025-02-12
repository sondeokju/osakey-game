import { Test, TestingModule } from '@nestjs/testing';
import { UserDiamondController } from './user_diamond.controller';
import { UserDiamondService } from './user_diamond.service';

describe('UserDiamondController', () => {
  let controller: UserDiamondController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDiamondController],
      providers: [UserDiamondService],
    }).compile();

    controller = module.get<UserDiamondController>(UserDiamondController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
