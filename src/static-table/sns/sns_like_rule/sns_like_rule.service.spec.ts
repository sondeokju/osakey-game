import { Test, TestingModule } from '@nestjs/testing';
import { SnsLikeRuleService } from './sns_like_rule.service';

describe('SnsLikeRuleService', () => {
  let service: SnsLikeRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnsLikeRuleService],
    }).compile();

    service = module.get<SnsLikeRuleService>(SnsLikeRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
