import { Controller } from '@nestjs/common';
import { UserFollowService } from './user_follow.service';

@Controller('user-follow')
export class UserFollowController {
  constructor(private readonly userFollowService: UserFollowService) {}
}
