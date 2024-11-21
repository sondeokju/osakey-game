import { Controller } from '@nestjs/common';
import { SnsLikeRuleService } from './sns_like_rule.service';

@Controller('sns-like-rule')
export class SnsLikeRuleController {
  constructor(private readonly snsLikeRuleService: SnsLikeRuleService) {}
}
