import { Injectable } from '@nestjs/common';
import { CreateEquipStatDto } from './dto/create-equip-stat.dto';
import { UpdateEquipStatDto } from './dto/update-equip-stat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipStat } from './entities/equip-stat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipStatService {
  constructor(
    @InjectRepository(EquipStat)
    private readonly equipStatsRepository: Repository<EquipStat>,
  ) {}

  create(createEquipStatDto: CreateEquipStatDto) {
    return 'This action adds a new equipStat';
  }

  findAll() {
    return `This action returns all equipStat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipStat`;
  }

  async getEquipStatId(id: number) {
    const result = await this.equipStatsRepository.findOne({
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
        index: id,
      },
      // relations: {
      //   need_item_idx: true,
      // },
    });

    return result;
  }

  async getEquipStat(
    item_equipslot_idx: number,
    item_grade_idx: number,
    item_level: number,
  ) {
    const result = await this.equipStatsRepository.findOne({
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
        item_equipslot_idx,
        item_grade_idx,
        item_level,
      },
      // relations: {
      //   need_item_idx: true,
      // },
    });

    return result;
  }

  update(id: number, updateEquipStatDto: UpdateEquipStatDto) {
    return `This action updates a #${id} equipStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipStat`;
  }
}
