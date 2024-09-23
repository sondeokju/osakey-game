import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RewardGroupService } from './reward_group.service';
import { CreateRewardGroupDto } from './dto/create-reward_group.dto';
import { UpdateRewardGroupDto } from './dto/update-reward_group.dto';

@Controller('reward-group')
export class RewardGroupController {
  constructor(private readonly rewardGroupService: RewardGroupService) {}

  @Post()
  create(@Body() createRewardGroupDto: CreateRewardGroupDto) {
    return this.rewardGroupService.create(createRewardGroupDto);
  }

  @Get()
  findAll() {
    return this.rewardGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewardGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRewardGroupDto: UpdateRewardGroupDto) {
    return this.rewardGroupService.update(+id, updateRewardGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardGroupService.remove(+id);
  }
}
