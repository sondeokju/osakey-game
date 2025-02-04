import { Test, TestingModule } from '@nestjs/testing';
import { UserTutorialService } from './user_tutorial.service';

describe('UserTutorialService', () => {
  let service: UserTutorialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTutorialService],
    }).compile();

    service = module.get<UserTutorialService>(UserTutorialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
