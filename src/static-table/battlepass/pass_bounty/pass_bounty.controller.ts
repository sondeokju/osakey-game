import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassBountyService } from './pass_bounty.service';
import { CreatePassBountyDto } from './dto/create-pass_bounty.dto';
import { UpdatePassBountyDto } from './dto/update-pass_bounty.dto';

@Controller('pass-bounty')
export class PassBountyController {
  constructor(private readonly passBountyService: PassBountyService) {}

  @Post()
  create(@Body() createPassBountyDto: CreatePassBountyDto) {
    return this.passBountyService.create(createPassBountyDto);
  }

  @Get()
  findAll() {
    return this.passBountyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passBountyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassBountyDto: UpdatePassBountyDto) {
    return this.passBountyService.update(+id, updatePassBountyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passBountyService.remove(+id);
  }
}
