import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserRentamaEquipSlot } from './entities/user_rentama_equip_slot.entity';
import { UserEquipService } from 'src/inventory/equipment/user_equip/user_equip.service';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { EquipLevelService } from 'src/static-table/equipment/equip_level/equip_level.service';

@Injectable()
export class UserRentamaEquipSlotService {
  constructor(
    @InjectRepository(UserRentamaEquipSlot)
    private readonly userRentamaEquipSlotRepository: Repository<UserRentamaEquipSlot>,
    private readonly userEquipService: UserEquipService,
    private readonly equipService: EquipService,
    private readonly equipLevelService: EquipLevelService,
  ) {}

  getUserRentamaEquipSlotRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserRentamaEquipSlot>(UserRentamaEquipSlot)
      : this.userRentamaEquipSlotRepository;
  }

  async rentamaEquipGrade(user_id: string, qr?: QueryRunner) {
    const userRentamaEquipSlotRepository =
      this.getUserRentamaEquipSlotRepository(qr);
    const slot = await userRentamaEquipSlotRepository.findOne({
      where: { user_id },
    });

    // 각 슬롯에 해당하는 필드명을 배열로 정의
    const equipTypes = ['acc', 'engine', 'armor', 'boost', 'shoes', 'weapon'];
    const equipGrades: number[] = [];

    // 각 슬롯 id에 대해 userEquip과 equip을 조회하여 equip_grade 값을 추출
    for (const equipType of equipTypes) {
      const equipSlotId = slot[equipType];
      const userEquip = await this.userEquipService.getUserEquip(
        equipSlotId,
        user_id,
        qr,
      );
      const equip = await this.equipService.getEquip(userEquip.equip_id);
      equipGrades.push(equip.equip_grade);
    }

    return equipGrades;
  }

  async rentamaEquipLevel(user_id: string, qr?: QueryRunner) {
    const userRentamaEquipSlotRepository =
      this.getUserRentamaEquipSlotRepository(qr);
    const slot = await userRentamaEquipSlotRepository.findOne({
      where: { user_id },
    });

    // 각 슬롯에 해당하는 필드명을 배열로 정의
    const equipTypes = ['acc', 'engine', 'armor', 'boost', 'shoes', 'weapon'];
    const equipGrades: number[] = [];

    // 각 슬롯 id에 대해 userEquip과 equip을 조회하여 equip_grade 값을 추출
    for (const equipType of equipTypes) {
      const equipSlotId = slot[equipType];
      const userEquip = await this.userEquipService.getUserEquip(
        equipSlotId,
        user_id,
        qr,
      );
      const equipLevel = await this.equipLevelService.getEquipLevel(
        userEquip.equip_level_id,
      );
      equipGrades.push(equipLevel.level);
    }

    return equipGrades;
  }
}
