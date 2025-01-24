import { Test, TestingModule } from '@nestjs/testing';
import { UserMemorizeController } from './user_memorize.controller';
import { UserMemorizeService } from './user_memorize.service';

describe('UserMemorizeController', () => {
  let controller: UserMemorizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMemorizeController],
      providers: [UserMemorizeService],
    }).compile();

    controller = module.get<UserMemorizeController>(UserMemorizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
