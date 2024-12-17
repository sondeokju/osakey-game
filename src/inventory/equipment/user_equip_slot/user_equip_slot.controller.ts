import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserEquipSlotService } from './user_equip_slot.service';

@Controller('user-equip-slot')
export class UserEquipSlotController {
  constructor(private readonly userEquipSlotService: UserEquipSlotService) {}
}
