import { Test, TestingModule } from '@nestjs/testing';
import { UserTutorialController } from './user_tutorial.controller';
import { UserTutorialService } from './user_tutorial.service';

describe('UserTutorialController', () => {
  let controller: UserTutorialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTutorialController],
      providers: [UserTutorialService],
    }).compile();

    controller = module.get<UserTutorialController>(UserTutorialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
