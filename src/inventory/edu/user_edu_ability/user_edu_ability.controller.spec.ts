import { Test, TestingModule } from '@nestjs/testing';
import { UserEduAbilityController } from './user_edu_ability.controller';
import { UserEduAbilityService } from './user_edu_ability.service';

describe('UserEduAbilityController', () => {
  let controller: UserEduAbilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEduAbilityController],
      providers: [UserEduAbilityService],
    }).compile();

    controller = module.get<UserEduAbilityController>(UserEduAbilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
