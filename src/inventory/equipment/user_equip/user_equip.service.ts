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
import { UserEquipOptionService } from '../user_equip_option/user_equip_option.service';

@Injectable()
export class UserEquipService {
  constructor(
    @InjectRepository(UserEquip)
    private readonly userEquipRepository: Repository<UserEquip>,
    private readonly equipService: EquipService,
    private readonly equipLevelService: EquipLevelService,
    private readonly userEquipSlotService: UserEquipSlotService,
    private readonly userEquipOptionService: UserEquipOptionService,
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

  async equipLevelUp(user_id: string, equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        equip_id,
      },
    });

    if (!userEquip) {
      throw new NotFoundException(`User equip with ID ${equip_id} not found.`);
    }

    const equipLevel = await this.equipLevelService.getEquipLevel(
      userEquip.equip_level_id,
      qr,
    );

    const equip = await this.equipService.getEquip(userEquip.equip_id, qr);

    if (!equipLevel) {
      throw new NotFoundException(
        `Equip level with ID ${userEquip.equip_level_id} not found.`,
      );
    }

    // 고드 아이템 차감 로직 (예: 고드 포인트 차감)
    // const cost = equipLevel.upgrade_cost;
    // const userGoldService = this.getUserGoldService(qr); // 유저 재화 관리 서비스
    // const isGoldSufficient = await userGoldService.reduceGold(user_id, cost);

    // if (!isGoldSufficient) {
    //   throw new BadRequestException('Insufficient gold for level up.');
    // }

    //level up
    const nextLevel = this.levelUp(
      userEquip.equip_level_id,
      equipLevel.level_max,
    );

    const updateUserEquip = await userEquipRepository.save({
      ...userEquip,
      equip_level_id: nextLevel,
    });

    if (equipLevel.level === equipLevel.level_max) {
      await this.userEquipOptionService.equipOptionAdd(
        user_id,
        equip.origin_equip_id,
        equip.equip_grade + 1,
        qr,
      );
    }

    return updateUserEquip;
  }
  async equipMaxLevelUp(user_id: string, equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);

    // 1. 사용자 장비 정보 가져오기
    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        equip_id,
      },
    });

    if (!userEquip) {
      throw new NotFoundException(`User equip with ID ${equip_id} not found.`);
    }

    // 2. 현재 장비 레벨 정보 가져오기
    const equipLevel = await this.equipLevelService.getEquipLevel(
      userEquip.equip_level_id,
      qr,
    );

    if (!equipLevel) {
      throw new NotFoundException(
        `Equip level with ID ${userEquip.equip_level_id} not found.`,
      );
    }

    const equip = await this.equipService.getEquip(userEquip.equip_id, qr);

    // 4. 최상 등급 확인
    if (
      parseInt(equipLevel.equip_grade, 10) === 5 &&
      equipLevel.level >= equipLevel.level_max
    ) {
      throw new BadRequestException(`It is already at the maximum grade.`);
    }

    // 4. 고드 및 재료 차감 (여기서는 로직을 주석으로 작성, 실제 구현 필요)
    // const requiredGold =
    //   equipLevel.require_gold * (equipLevel.level_max - equipLevel.level);
    // const requiredItems =
    //   equipLevel.require_item_count * (equipLevel.level_max - equipLevel.level);

    // 예: 고드 차감 로직
    // const isGoldSufficient = await this.userGoldService.reduceGold(user_id, requiredGold);
    // if (!isGoldSufficient) {
    //   throw new BadRequestException('Insufficient gold for batch level up.');
    // }

    // 예: 재료 차감 로직
    // const isItemSufficient = await this.userInventoryService.reduceItems(
    //   user_id,
    //   equipLevel.require_item_id,
    //   requiredItems,
    // );
    // if (!isItemSufficient) {
    //   throw new BadRequestException('Insufficient items for batch level up.');
    // }

    // 5. level_max로 레벨업
    const maxLevelId = this.getMaxLevelId(userEquip.equip_level_id);

    // 6. 장비 레벨 업데이트
    const updatedUserEquip = await userEquipRepository.save({
      ...userEquip,
      equip_level_id: maxLevelId,
    });

    if (equipLevel.level === equipLevel.level_max) {
      await this.userEquipOptionService.equipOptionAdd(
        user_id,
        equip.origin_equip_id,
        equip.equip_grade + 1,
        qr,
      );
    }

    return updatedUserEquip;
  }

  getMaxLevelId(currentLevelId: number): number {
    const levelString = currentLevelId.toString();
    const basePart = parseInt(levelString.slice(0, -2)) + 1; // '11200001'

    // 최대 레벨을 조합하여 새로운 ID 생성
    return parseInt(`${basePart}${'01'}`, 10);
  }

  levelUp(currentLevelId: number, levelMax: number): number {
    const levelString = currentLevelId.toString();

    const basePart = levelString.slice(0, -2); // '11200001'
    const levelPart = levelString.slice(-2); // '20'

    const currentLevel = parseInt(levelPart, 10);

    let nextLevel: number;
    if (currentLevel >= levelMax) {
      return this.getMaxLevelId(currentLevelId);
    } else {
      nextLevel = currentLevel + 1;
      return parseInt(
        `${basePart}${nextLevel.toString().padStart(2, '0')}`,
        10,
      );
    }
  }

  // levelUp(currentLevel: number): number {
  //   const levelString = currentLevel.toString();

  //   const basePart = levelString.slice(0, -2);
  //   const levelPart = levelString.slice(-2);

  //   const nextLevel = parseInt(levelPart, 10) + 1;
  //   const nextLevelString = nextLevel.toString().padStart(2, '0');

  //   const newLevelString = `${basePart}${nextLevelString}`;
  //   return parseInt(newLevelString, 10);
  // }
}
