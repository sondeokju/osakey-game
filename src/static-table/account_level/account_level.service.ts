import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountLevelDto } from './dto/create-account_level.dto';
import { UpdateAccountLevelDto } from './dto/update-account_level.dto';
import { AccountLevel } from './entities/account_level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountLevelService {
  constructor(
    @InjectRepository(AccountLevel)
    private readonly accountLevelRepository: Repository<AccountLevel>,
  ) {}

  async getAccountLevel(id: number) {
    const result = await this.accountLevelRepository.findOne({
      // select: {
      //   index: true,
      //   name: true,
      //   item_category_name: true,
      //   item_category_value: true,
      //   debug_name: true,
      //   str_name: true,
      //   str_desc: true,
      //   res_icon_name: true,
      //   item_level: true,
      // },
      where: {
        account_level_id: id,
      },
    });

    return result;
  }

  create(createAccountLevelDto: CreateAccountLevelDto) {
    return 'This action adds a new accountLevel';
  }

  findAll() {
    return `This action returns all accountLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountLevel`;
  }

  update(id: number, updateAccountLevelDto: UpdateAccountLevelDto) {
    return `This action updates a #${id} accountLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountLevel`;
  }
}
