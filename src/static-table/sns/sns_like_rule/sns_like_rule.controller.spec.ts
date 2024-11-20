import { Test, TestingModule } from '@nestjs/testing';
import { SnsLikeRuleController } from './sns_like_rule.controller';
import { SnsLikeRuleService } from './sns_like_rule.service';

describe('SnsLikeRuleController', () => {
  let controller: SnsLikeRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnsLikeRuleController],
      providers: [SnsLikeRuleService],
    }).compile();

    controller = module.get<SnsLikeRuleController>(SnsLikeRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
