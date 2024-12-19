import { Test, TestingModule } from '@nestjs/testing';
import { UserEquipOptionController } from './user_equip_option.controller';
import { UserEquipOptionService } from './user_equip_option.service';

describe('UserEquipOptionController', () => {
  let controller: UserEquipOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEquipOptionController],
      providers: [UserEquipOptionService],
    }).compile();

    controller = module.get<UserEquipOptionController>(UserEquipOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
