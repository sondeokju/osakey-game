import { Test, TestingModule } from '@nestjs/testing';
import { UserAdController } from './user_ad.controller';
import { UserAdService } from './user_ad.service';

describe('UserAdController', () => {
  let controller: UserAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAdController],
      providers: [UserAdService],
    }).compile();

    controller = module.get<UserAdController>(UserAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
