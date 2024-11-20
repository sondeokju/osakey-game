import { PartialType } from '@nestjs/mapped-types';
import { CreateSnsLikeRuleDto } from './create-sns_like_rule.dto';

export class UpdateSnsLikeRuleDto extends PartialType(CreateSnsLikeRuleDto) {}
