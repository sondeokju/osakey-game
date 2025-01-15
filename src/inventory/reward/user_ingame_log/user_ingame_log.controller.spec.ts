import { Test, TestingModule } from '@nestjs/testing';
import { UserIngameLogController } from './user_ingame_log.controller';
import { UserIngameLogService } from './user_ingame_log.service';

describe('UserIngameLogController', () => {
  let controller: UserIngameLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserIngameLogController],
      providers: [UserIngameLogService],
    }).compile();

    controller = module.get<UserIngameLogController>(UserIngameLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
