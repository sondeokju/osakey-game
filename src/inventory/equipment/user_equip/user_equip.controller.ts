import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserEquipService } from './user_equip.service';

@Controller('user-equip')
export class UserEquipController {
  constructor(private readonly userEquipService: UserEquipService) {}
}
