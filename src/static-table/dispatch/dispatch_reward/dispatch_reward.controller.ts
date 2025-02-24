import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispatchRewardService } from './dispatch_reward.service';
import { CreateDispatchRewardDto } from './dto/create-dispatch_reward.dto';
import { UpdateDispatchRewardDto } from './dto/update-dispatch_reward.dto';

@Controller('dispatch-reward')
export class DispatchRewardController {
  constructor(private readonly dispatchRewardService: DispatchRewardService) {}

  @Post()
  create(@Body() createDispatchRewardDto: CreateDispatchRewardDto) {
    return this.dispatchRewardService.create(createDispatchRewardDto);
  }

  @Get()
  findAll() {
    return this.dispatchRewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatchRewardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispatchRewardDto: UpdateDispatchRewardDto) {
    return this.dispatchRewardService.update(+id, updateDispatchRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatchRewardService.remove(+id);
  }
}
