import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispatchTestService } from './dispatch_test.service';
import { CreateDispatchTestDto } from './dto/create-dispatch_test.dto';
import { UpdateDispatchTestDto } from './dto/update-dispatch_test.dto';

@Controller('dispatch-test')
export class DispatchTestController {
  constructor(private readonly dispatchTestService: DispatchTestService) {}

  @Post()
  create(@Body() createDispatchTestDto: CreateDispatchTestDto) {
    return this.dispatchTestService.create(createDispatchTestDto);
  }

  @Get()
  findAll() {
    return this.dispatchTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatchTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispatchTestDto: UpdateDispatchTestDto) {
    return this.dispatchTestService.update(+id, updateDispatchTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatchTestService.remove(+id);
  }
}
