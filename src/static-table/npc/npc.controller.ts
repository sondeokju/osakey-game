import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NpcService } from './npc.service';
import { CreateNpcDto } from './dto/create-npc.dto';
import { UpdateNpcDto } from './dto/update-npc.dto';

@Controller('npc')
export class NpcController {
  constructor(private readonly npcService: NpcService) {}

  @Post()
  create(@Body() createNpcDto: CreateNpcDto) {
    return this.npcService.create(createNpcDto);
  }

  @Get()
  findAll() {
    return this.npcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.npcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNpcDto: UpdateNpcDto) {
    return this.npcService.update(+id, updateNpcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.npcService.remove(+id);
  }
}
