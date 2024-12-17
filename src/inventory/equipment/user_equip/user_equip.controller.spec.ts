import { Test, TestingModule } from '@nestjs/testing';
import { UserEquipController } from './user_equip.controller';
import { UserEquipService } from './user_equip.service';

describe('UserEquipController', () => {
  let controller: UserEquipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEquipController],
      providers: [UserEquipService],
    }).compile();

    controller = module.get<UserEquipController>(UserEquipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
