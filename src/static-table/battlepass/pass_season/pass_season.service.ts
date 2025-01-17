import { Injectable } from '@nestjs/common';
import { CreatePassSeasonDto } from './dto/create-pass_season.dto';
import { UpdatePassSeasonDto } from './dto/update-pass_season.dto';

@Injectable()
export class PassSeasonService {
  create(createPassSeasonDto: CreatePassSeasonDto) {
    return 'This action adds a new passSeason';
  }

  findAll() {
    return `This action returns all passSeason`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passSeason`;
  }

  update(id: number, updatePassSeasonDto: UpdatePassSeasonDto) {
    return `This action updates a #${id} passSeason`;
  }

  remove(id: number) {
    return `This action removes a #${id} passSeason`;
  }
}
