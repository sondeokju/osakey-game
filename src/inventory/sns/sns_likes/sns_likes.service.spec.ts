import { Test, TestingModule } from '@nestjs/testing';
import { SnsLikesService } from './sns_likes.service';

describe('SnsLikesService', () => {
  let service: SnsLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnsLikesService],
    }).compile();

    service = module.get<SnsLikesService>(SnsLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
