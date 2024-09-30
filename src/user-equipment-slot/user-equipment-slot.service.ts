import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserEquipmentSlot } from './entities/user-equipment-slot.entity';
import { UserEquipment } from 'src/user-equipment/entities/user-equipment.entity';
import { ItemService } from 'src/static-table/item/item.service';

@Injectable()
export class UserEquipmentSlotService {
  constructor(
    @InjectRepository(UserEquipmentSlot)
    private readonly userEquipmentSlotRepository: Repository<UserEquipmentSlot>,
    @InjectRepository(UserEquipment)
    private readonly userEquipmentRepository: Repository<UserEquipment>,
    private readonly itemService: ItemService,
  ) {}

  getUserEquipmentSlotRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquipmentSlot>(UserEquipmentSlot)
      : this.userEquipmentSlotRepository;
  }

  async createEquipmentSlot(user_id: number, qr?: QueryRunner) {
    const userEquipmentslotRepository = this.getUserEquipmentSlotRepository(qr);

    const equipmentExists = await userEquipmentslotRepository.exist({
      where: {
        user_id: user_id,
      },
    });

    if (!equipmentExists) {
      const userObject = userEquipmentslotRepository.create({
        update_at: Date(),
        created_at: Date(),
        user_id: user_id,
        equip_1: 0,
        equip_2: 0,
        equip_3: 0,
        equip_4: 0,
        equip_5: 0,
        equip_6: 0,
      });

      const newEqipment = await userEquipmentslotRepository.save(userObject);

      return newEqipment;
    }
  }

  async patchEquipSlot(
    user_id: number,
    user_equipment_id: number,
    qr?: QueryRunner,
  ) {
    const userEquipmentslotRepository = this.getUserEquipmentSlotRepository(qr);
    const existing = await userEquipmentslotRepository.findOne({
      where: {
        user_id: user_id,
      },
    });

    const userEquipment = await this.userEquipmentRepository.findOne({
      where: {
        id: user_equipment_id,
      },
    });

    console.log('userEquipment.equipment_id:', userEquipment.equipment_id);

    const itemData = await this.itemService.getItem(userEquipment.equipment_id);

    // const slot_id = itemData.item_equipslot_idx.index;

    // switch (slot_id) {
    //   case 202:
    //     existing.equip_1 = userEquipment.id;
    //     break;
    //   case 203:
    //     existing.equip_2 = userEquipment.id;
    //     break;
    //   case 204:
    //     existing.equip_3 = userEquipment.id;
    //     break;
    //   case 205:
    //     existing.equip_4 = userEquipment.id;
    //     break;
    //   case 206:
    //     existing.equip_5 = userEquipment.id;
    //     break;
    //   case 207:
    //     existing.equip_6 = userEquipment.id;
    //     break;
    //   default:
    //     console.log('error');
    // }

    await userEquipmentslotRepository.save({
      ...existing,
    });

    return true;
  }

  async getUserEquipmentSlot(user_id: number) {
    //const userEquipmentslotRepository = this.getUserEquipmentSlotRepository(qr);
    const result = await this.userEquipmentSlotRepository.findOne({
      select: {
        id: true,
        update_at: true,
        created_at: true,
        user_id: true,
        equip_1: true,
        equip_2: true,
        equip_3: true,
        equip_4: true,
        equip_5: true,
        equip_6: true,
      },
      where: {
        user_id: user_id,
      },
    });
    return result;
  }
}
