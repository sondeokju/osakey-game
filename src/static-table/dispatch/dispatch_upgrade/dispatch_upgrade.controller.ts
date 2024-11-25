import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispatchUpgradeService } from './dispatch_upgrade.service';
import { CreateDispatchUpgradeDto } from './dto/create-dispatch_upgrade.dto';
import { UpdateDispatchUpgradeDto } from './dto/update-dispatch_upgrade.dto';

@Controller('dispatch-upgrade')
export class DispatchUpgradeController {
  constructor(private readonly dispatchUpgradeService: DispatchUpgradeService) {}

  @Post()
  create(@Body() createDispatchUpgradeDto: CreateDispatchUpgradeDto) {
    return this.dispatchUpgradeService.create(createDispatchUpgradeDto);
  }

  @Get()
  findAll() {
    return this.dispatchUpgradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatchUpgradeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispatchUpgradeDto: UpdateDispatchUpgradeDto) {
    return this.dispatchUpgradeService.update(+id, updateDispatchUpgradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatchUpgradeService.remove(+id);
  }
}
