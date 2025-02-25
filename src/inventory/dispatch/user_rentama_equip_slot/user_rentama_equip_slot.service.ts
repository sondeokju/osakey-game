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
import { EquipGradeService } from 'src/static-table/equipment/equip_grade/equip_grade.service';
import { EquipLevelService } from 'src/static-table/equipment/equip_level/equip_level.service';

@Injectable()
export class UserRentamaEquipSlotService {
  constructor(
    @InjectRepository(UserRentamaEquipSlot)
    private readonly userRentamaEquipSlotRepository: Repository<UserRentamaEquipSlot>,
    private readonly userEquipService: UserEquipService,
    private readonly equipGradeService: EquipGradeService,
    private readonly equipLevelService: EquipLevelService,
  ) {}

  getUserRentamaEquipSlotRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserRentamaEquipSlot>(UserRentamaEquipSlot)
      : this.userRentamaEquipSlotRepository;
  }

  async getUserRentamaEquipSlot(user_id: string, qr?: QueryRunner) {
    const userRentamaEquipSlotRepository =
      this.getUserRentamaEquipSlotRepository(qr);
    const result = await userRentamaEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    return result;
  }
}
