import { Test, TestingModule } from '@nestjs/testing';
import { UserEduAbilityService } from './user_edu_ability.service';

describe('UserEduAbilityService', () => {
  let service: UserEduAbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEduAbilityService],
    }).compile();

    service = module.get<UserEduAbilityService>(UserEduAbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
