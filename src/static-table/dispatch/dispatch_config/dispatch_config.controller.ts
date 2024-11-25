import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispatchConfigService } from './dispatch_config.service';
import { CreateDispatchConfigDto } from './dto/create-dispatch_config.dto';
import { UpdateDispatchConfigDto } from './dto/update-dispatch_config.dto';

@Controller('dispatch-config')
export class DispatchConfigController {
  constructor(private readonly dispatchConfigService: DispatchConfigService) {}

  @Post()
  create(@Body() createDispatchConfigDto: CreateDispatchConfigDto) {
    return this.dispatchConfigService.create(createDispatchConfigDto);
  }

  @Get()
  findAll() {
    return this.dispatchConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatchConfigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispatchConfigDto: UpdateDispatchConfigDto) {
    return this.dispatchConfigService.update(+id, updateDispatchConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatchConfigService.remove(+id);
  }
}
