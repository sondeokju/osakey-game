import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecameDiaryService } from './secame_diary.service';
import { CreateSecameDiaryDto } from './dto/create-secame_diary.dto';
import { UpdateSecameDiaryDto } from './dto/update-secame_diary.dto';

@Controller('secame-diary')
export class SecameDiaryController {
  constructor(private readonly secameDiaryService: SecameDiaryService) {}

  @Post()
  create(@Body() createSecameDiaryDto: CreateSecameDiaryDto) {
    return this.secameDiaryService.create(createSecameDiaryDto);
  }

  @Get()
  findAll() {
    return this.secameDiaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secameDiaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecameDiaryDto: UpdateSecameDiaryDto) {
    return this.secameDiaryService.update(+id, updateSecameDiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secameDiaryService.remove(+id);
  }
}
