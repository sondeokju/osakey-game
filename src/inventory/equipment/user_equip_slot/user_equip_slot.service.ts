import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEquipSlot } from './entities/user_equip_slot.entity';
import { QueryRunner, Repository } from 'typeorm';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';

@Injectable()
export class UserEquipSlotService {
  constructor(
    @InjectRepository(UserEquipSlot)
    private readonly userEquipSlotRepository: Repository<UserEquipSlot>,
    private readonly equipService: EquipService,
  ) {}

  getUserEquipSlotRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquipSlot>(UserEquipSlot)
      : this.userEquipSlotRepository;
  }

  async equipSlotMount(user_id: string, equip_id: number, qr?: QueryRunner) {
    const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
    const userEquipSlot = await userEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    // if (!userEquipSlot) {
    //   throw new NotFoundException(
    //     `No equip slot found for user_id: ${user_id}`,
    //   );
    // }

    const equip = await this.equipService.getEquip(equip_id, qr);
    if (!equip) {
      throw new NotFoundException(`Equip with ID ${equip_id} not found.`);
    }

    const equipSlotMap = {
      acc: 'acc',
      engine: 'engine',
      armor: 'armor',
      boost: 'boost',
      shoes: 'shoes',
      weapon: 'weapon',
    };

    const equipSlotKey = equip.equip_slot.toLowerCase();
    userEquipSlot[equipSlotMap[equipSlotKey]] = equip_id;

    const result = await userEquipSlotRepository.save({
      ...userEquipSlot,
    });

    return result;
  }

  async getEquipSlot(user_id: string, qr?: QueryRunner) {
    const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
    const userEquipSlot = await userEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    return userEquipSlot;
  }
}
