import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEquipSlot } from './entities/user_equip_slot.entity';
import { In, QueryRunner, Repository } from 'typeorm';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { UserEquipService } from '../user_equip/user_equip.service';
import { UserEquip } from '../user_equip/entities/user_equip.entity';

@Injectable()
export class UserEquipSlotService {
  constructor(
    @InjectRepository(UserEquipSlot)
    private readonly userEquipSlotRepository: Repository<UserEquipSlot>,
    private readonly userEquipRepository: Repository<UserEquip>,
    private readonly equipService: EquipService,
    private readonly userEquipService: UserEquipService,
  ) {}

  getUserEquipSlotRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquipSlot>(UserEquipSlot)
      : this.userEquipSlotRepository;
  }

  getUserEquipRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquip>(UserEquip)
      : this.userEquipRepository;
  }

  async equipSlotMount(
    user_id: string,
    user_equip_id: number,
    equip_id: number,
    qr?: QueryRunner,
  ) {
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

    await this.userEquipService.equipMountYN(user_id, +user_equip_id);
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

    // UserEquipSlot에서 equipIds 생성
    const equipIds = [
      userEquipSlot.acc,
      userEquipSlot.engine,
      userEquipSlot.armor,
      userEquipSlot.boost,
      userEquipSlot.shoes,
      userEquipSlot.weapon,
    ];

    await this.resetUserEquipMount(user_id, equipIds, qr);

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

    // UserEquipSlot에서 equipIds 생성
    const equipIds = [
      userEquipSlot.acc,
      userEquipSlot.engine,
      userEquipSlot.armor,
      userEquipSlot.boost,
      userEquipSlot.shoes,
      userEquipSlot.weapon,
    ];

    await this.resetUserEquipMount(user_id, equipIds, qr);
    return result;
  }

  async resetUserEquipMount(
    user_id: string,
    equipIds: number[],
    qr?: QueryRunner,
  ) {
    const userEquipRepository = this.getUserEquipRepository(qr);

    // 1. userEquip 테이블의 mount_yn을 모두 'N'으로 업데이트
    const userEquips = await userEquipRepository.findBy({
      user_id,
      equip_id: In(equipIds), // TypeORM의 In 연산자를 사용하여 여러 equip_id를 조회
    });

    if (userEquips.length === 0) {
      throw new Error(
        `No matching UserEquip entries found for user_id=${user_id}`,
      );
    }

    // 2. mount_yn 값을 'N'으로 업데이트
    const updatedUserEquips = userEquips.map((equip) => ({
      ...equip,
      mount_yn: 'N',
    }));

    // 3. 데이터 저장
    await userEquipRepository.save(updatedUserEquips);

    return {
      message:
        'Successfully updated mount_yn to N for all related UserEquip entries',
      updatedEquipIds: equipIds,
    };
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
