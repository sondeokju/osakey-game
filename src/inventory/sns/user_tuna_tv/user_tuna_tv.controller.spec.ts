import { Test, TestingModule } from '@nestjs/testing';
import { UserTunaTvController } from './user_tuna_tv.controller';
import { UserTunaTvService } from './user_tuna_tv.service';

describe('UserTunaTvController', () => {
  let controller: UserTunaTvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTunaTvController],
      providers: [UserTunaTvService],
    }).compile();

    controller = module.get<UserTunaTvController>(UserTunaTvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
