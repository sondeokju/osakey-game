import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserEquip } from './entities/user_equip.entity';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { EquipLevelService } from 'src/static-table/equipment/equip_level/equip_level.service';
import { UserEquipSlotService } from '../user_equip_slot/user_equip_slot.service';

@Injectable()
export class UserEquipService {
  constructor(
    @InjectRepository(UserEquip)
    private readonly userEquipRepository: Repository<UserEquip>,
    private readonly equipService: EquipService,
    private readonly equipLevelService: EquipLevelService,
    private readonly userEquipSlotService: UserEquipSlotService,
  ) {}

  getUserEquipRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquip>(UserEquip)
      : this.userEquipRepository;
  }

  async createEquip(user_id: string, equip_id: number, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    if (!equip_id || isNaN(equip_id)) {
      throw new BadRequestException('Invalid equip_id provided.');
    }

    const equip_level_id = `${equip_id}01`;
    const equipLevel = await this.equipLevelService.getEquipLevel(
      +equip_level_id,
      qr,
    );

    if (!equipLevel) {
      throw new NotFoundException(
        `Equip level with ID ${equip_level_id} not found.`,
      );
    }

    await this.getUserEquipRepository(qr).insert({
      user_id,
      equip_id,
      equip_level_id: equipLevel.equip_level_id,
    });

    return this.getUserEquipRepository(qr).find({ where: { user_id } });
  }

  async equipList(user_id: string, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.find({
      where: {
        user_id,
      },
    });

    return userEquip;
  }

  async equipMount(user_id: string, equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        equip_id,
      },
    });

    // if (!userEquip) {
    //   throw new NotFoundException('equip_id not found');
    // }

    return await this.userEquipSlotService.equipSlotMount(
      user_id,
      equip_id,
      qr,
    );
  }
}
