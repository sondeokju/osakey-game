import { Test, TestingModule } from '@nestjs/testing';
import { UserHeroService } from './user_hero.service';

describe('UserHeroService', () => {
  let service: UserHeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHeroService],
    }).compile();

    service = module.get<UserHeroService>(UserHeroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
