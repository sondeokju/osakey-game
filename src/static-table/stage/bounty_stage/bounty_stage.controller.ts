import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BountyStageService } from './bounty_stage.service';
import { CreateBountyStageDto } from './dto/create-bounty_stage.dto';
import { UpdateBountyStageDto } from './dto/update-bounty_stage.dto';

@Controller('bounty-stage')
export class BountyStageController {
  constructor(private readonly bountyStageService: BountyStageService) {}

  @Post()
  create(@Body() createBountyStageDto: CreateBountyStageDto) {
    return this.bountyStageService.create(createBountyStageDto);
  }

  @Get()
  findAll() {
    return this.bountyStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bountyStageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBountyStageDto: UpdateBountyStageDto) {
    return this.bountyStageService.update(+id, updateBountyStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bountyStageService.remove(+id);
  }
}
