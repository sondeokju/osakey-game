import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnsRewardService } from './sns_reward.service';
import { CreateSnsRewardDto } from './dto/create-sns_reward.dto';
import { UpdateSnsRewardDto } from './dto/update-sns_reward.dto';

@Controller('sns-reward')
export class SnsRewardController {
  constructor(private readonly snsRewardService: SnsRewardService) {}

  @Post()
  create(@Body() createSnsRewardDto: CreateSnsRewardDto) {
    return this.snsRewardService.create(createSnsRewardDto);
  }

  @Get()
  findAll() {
    return this.snsRewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snsRewardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnsRewardDto: UpdateSnsRewardDto) {
    return this.snsRewardService.update(+id, updateSnsRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snsRewardService.remove(+id);
  }
}
