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
    let userEquipSlot = await userEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userEquipSlot) {
      userEquipSlot = userEquipSlotRepository.create({
        user_id,
        acc: 0,
        engine: 0,
        armor: 0,
        boost: 0,
        shoes: 0,
        weapon: 0,
      });
    }

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
    userEquipSlot[equipSlotMap[equipSlotKey]] = +equip_id;

    const result = await userEquipSlotRepository.save({
      ...userEquipSlot,
    });

    return result;
  }

  async equipSlotReset(user_id: string, qr?: QueryRunner) {
    const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
    const userEquipSlot = await userEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    const result = await userEquipSlotRepository.save({
      ...userEquipSlot,
      acc: 0,
      engine: 0,
      armor: 0,
      boost: 0,
      shoes: 0,
      weapon: 0,
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
