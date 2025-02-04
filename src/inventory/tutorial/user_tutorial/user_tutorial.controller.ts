import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserTutorialService } from './user_tutorial.service';

@Controller('user-tutorial')
export class UserTutorialController {
  constructor(private readonly userTutorialService: UserTutorialService) {}
}
