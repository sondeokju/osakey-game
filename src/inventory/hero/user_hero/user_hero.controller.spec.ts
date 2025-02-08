import { Test, TestingModule } from '@nestjs/testing';
import { UserHeroController } from './user_hero.controller';
import { UserHeroService } from './user_hero.service';

describe('UserHeroController', () => {
  let controller: UserHeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHeroController],
      providers: [UserHeroService],
    }).compile();

    controller = module.get<UserHeroController>(UserHeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
