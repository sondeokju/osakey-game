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

@Injectable()
export class UserRentamaEquipSlotService {
  constructor(
    @InjectRepository(UserRentamaEquipSlot)
    private readonly userRentamaEquipSlotRepository: Repository<UserRentamaEquipSlot>,
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
