import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserChallengeExtraService } from './user_challenge_extra.service';

@Controller('user-challenge-extra')
export class UserChallengeExtraController {
  constructor(
    private readonly userChallengeExtraService: UserChallengeExtraService,
  ) {}
}
