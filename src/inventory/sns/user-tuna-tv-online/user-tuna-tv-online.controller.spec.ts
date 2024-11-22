import { Test, TestingModule } from '@nestjs/testing';
import { UserTunaTvOnlineController } from './user-tuna-tv-online.controller';
import { UserTunaTvOnlineService } from './user-tuna-tv-online.service';

describe('UserTunaTvOnlineController', () => {
  let controller: UserTunaTvOnlineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTunaTvOnlineController],
      providers: [UserTunaTvOnlineService],
    }).compile();

    controller = module.get<UserTunaTvOnlineController>(UserTunaTvOnlineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
