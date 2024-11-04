import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NpcLocationService } from './npc_location.service';

@Controller('npc-location')
export class NpcLocationController {
  constructor(private readonly npcLocationService: NpcLocationService) {}
}
