import { Test, TestingModule } from '@nestjs/testing';
import { UserGachaCheckController } from './user_gacha_check.controller';
import { UserGachaCheckService } from './user_gacha_check.service';

describe('UserGachaCheckController', () => {
  let controller: UserGachaCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGachaCheckController],
      providers: [UserGachaCheckService],
    }).compile();

    controller = module.get<UserGachaCheckController>(UserGachaCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
