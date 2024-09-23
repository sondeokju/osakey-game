import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountLevelService } from './account_level.service';
import { CreateAccountLevelDto } from './dto/create-account_level.dto';
import { UpdateAccountLevelDto } from './dto/update-account_level.dto';

@Controller('account-level')
export class AccountLevelController {
  constructor(private readonly accountLevelService: AccountLevelService) {}

  @Post()
  create(@Body() createAccountLevelDto: CreateAccountLevelDto) {
    return this.accountLevelService.create(createAccountLevelDto);
  }

  @Get()
  findAll() {
    return this.accountLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountLevelDto: UpdateAccountLevelDto) {
    return this.accountLevelService.update(+id, updateAccountLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountLevelService.remove(+id);
  }
}
