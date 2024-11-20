import { Module } from '@nestjs/common';
import { SnsLikeRuleService } from './sns_like_rule.service';
import { SnsLikeRuleController } from './sns_like_rule.controller';

@Module({
  controllers: [SnsLikeRuleController],
  providers: [SnsLikeRuleService],
})
export class SnsLikeRuleModule {}
