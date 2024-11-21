import { Controller } from '@nestjs/common';
import { UserSnsFollowService } from './user_sns_follow.service';

@Controller('user-sns-follow')
export class UserSnsFollowController {
  constructor(private readonly userSnsFollowService: UserSnsFollowService) {}
}
