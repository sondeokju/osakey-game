import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnsLikeRuleService } from './sns_like_rule.service';
import { CreateSnsLikeRuleDto } from './dto/create-sns_like_rule.dto';
import { UpdateSnsLikeRuleDto } from './dto/update-sns_like_rule.dto';

@Controller('sns-like-rule')
export class SnsLikeRuleController {
  constructor(private readonly snsLikeRuleService: SnsLikeRuleService) {}

  @Post()
  create(@Body() createSnsLikeRuleDto: CreateSnsLikeRuleDto) {
    return this.snsLikeRuleService.create(createSnsLikeRuleDto);
  }

  @Get()
  findAll() {
    return this.snsLikeRuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snsLikeRuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnsLikeRuleDto: UpdateSnsLikeRuleDto) {
    return this.snsLikeRuleService.update(+id, updateSnsLikeRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snsLikeRuleService.remove(+id);
  }
}
