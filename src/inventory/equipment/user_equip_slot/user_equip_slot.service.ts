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

  async equipSlotMount(
    user_id: string,
    user_equip_id: number,
    equip_id: number,
    qr?: QueryRunner,
  ) {
    console.log('equipSlotMount 1');
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

    console.log('equipSlotMount 2');

    if (equip_id > 0) {
      console.log('equip_id', equip_id);
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
      userEquipSlot[equipSlotMap[equipSlotKey]] = +user_equip_id;
    }

    console.log('equipSlotMount 3');

    const result = await userEquipSlotRepository.save({
      ...userEquipSlot,
    });

    return result;
  }

  async equipSlotRelease(
    user_id: string,
    acc: number,
    engine: number,
    armor: number,
    boost: number,
    shoes: number,
    weapon: number,
    qr?: QueryRunner,
  ) {
    const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
    let userEquipSlot = await userEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userEquipSlot) {
      throw new Error(`EquipSlot not found for user_id: ${user_id}`);
    }

    userEquipSlot.acc = acc === 0 ? 0 : userEquipSlot.acc;
    userEquipSlot.engine = engine === 0 ? 0 : userEquipSlot.engine;
    userEquipSlot.armor = armor === 0 ? 0 : userEquipSlot.armor;
    userEquipSlot.boost = boost === 0 ? 0 : userEquipSlot.boost;
    userEquipSlot.shoes = shoes === 0 ? 0 : userEquipSlot.shoes;
    userEquipSlot.weapon = weapon === 0 ? 0 : userEquipSlot.weapon;

    const result = await userEquipSlotRepository.save(userEquipSlot);
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
