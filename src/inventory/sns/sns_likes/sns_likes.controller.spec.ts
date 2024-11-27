import { Test, TestingModule } from '@nestjs/testing';
import { SnsLikesController } from './sns_likes.controller';
import { SnsLikesService } from './sns_likes.service';

describe('SnsLikesController', () => {
  let controller: SnsLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnsLikesController],
      providers: [SnsLikesService],
    }).compile();

    controller = module.get<SnsLikesController>(SnsLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
