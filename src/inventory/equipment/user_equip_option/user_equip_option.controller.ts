import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserEquipOptionService } from './user_equip_option.service';

@Controller('user-equip-option')
export class UserEquipOptionController {
  constructor(
    private readonly userEquipOptionService: UserEquipOptionService,
  ) {}
}
