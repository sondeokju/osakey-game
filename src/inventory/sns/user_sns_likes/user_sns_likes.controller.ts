import { Controller } from '@nestjs/common';
import { UserSnsLikesService } from './user_sns_likes.service';

@Controller('sns-likes')
export class UserSnsLikesController {
  constructor(private readonly userSnsLikesService: UserSnsLikesService) {}
}
