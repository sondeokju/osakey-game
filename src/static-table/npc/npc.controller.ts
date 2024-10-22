import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NpcService } from './npc.service';
import { CreateNpcDto } from './dto/create-npc.dto';
import { UpdateNpcDto } from './dto/update-npc.dto';

@Controller('npc')
export class NpcController {
  constructor(private readonly npcService: NpcService) {}
}
