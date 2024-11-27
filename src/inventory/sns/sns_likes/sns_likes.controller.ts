import { Controller } from '@nestjs/common';
import { SnsLikesService } from './sns_likes.service';

@Controller('sns-likes')
export class SnsLikesController {
  constructor(private readonly snsLikesService: SnsLikesService) {}
}
