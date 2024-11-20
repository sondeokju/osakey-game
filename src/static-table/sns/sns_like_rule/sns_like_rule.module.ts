import { Module } from '@nestjs/common';
import { SnsLikeRuleService } from './sns_like_rule.service';
import { SnsLikeRuleController } from './sns_like_rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnsLikeRule } from './entities/sns_like_rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SnsLikeRule])],
  exports: [SnsLikeRuleService],
  controllers: [SnsLikeRuleController],
  providers: [SnsLikeRuleService],
})
export class SnsLikeRuleModule {}
