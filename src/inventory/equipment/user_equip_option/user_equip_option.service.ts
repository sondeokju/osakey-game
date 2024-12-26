import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserEquipOption } from './entities/user_equip_option.entity';
import { EquipOptionService } from 'src/static-table/equipment/equip_option/equip_option.service';

@Injectable()
export class UserEquipOptionService {
  constructor(
    @InjectRepository(UserEquipOption)
    private readonly userEquipOptionRepository: Repository<UserEquipOption>,
    private readonly equipOptionService: EquipOptionService,
  ) {}

  getUserEquipOptionRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquipOption>(UserEquipOption)
      : this.userEquipOptionRepository;
  }

  async equipOptionAdd(
    user_id: string,
    origin_equip_id: number,
    option_grade: number,
    qr?: QueryRunner,
  ) {
    // if (!user_id || typeof user_id !== 'string') {
    //   throw new BadRequestException('Invalid user_id provided.');
    // }
    // if (!equip_id || isNaN(equip_id)) {
    //   throw new BadRequestException('Invalid equip_id provided.');
    // }

    const userEquipOptionRepository = this.getUserEquipOptionRepository(qr);
    const userEquipOption = await userEquipOptionRepository.findOne({
      where: {
        user_id,
        origin_equip_id,
        option_grade,
      },
    });

    if (userEquipOption) {
      throw new NotFoundException('The buff already exists.');
    }

    const equipOption = await this.equipOptionService.getEquipOption(
      origin_equip_id,
      option_grade,
      qr,
    );

    if (!equipOption) {
      throw new NotFoundException(
        `Equip option with ID ${origin_equip_id} not found.`,
      );
    }

    await this.getUserEquipOptionRepository(qr).insert({
      user_id,
      origin_equip_id,
      option_grade,
      option_type: equipOption.option_type,
      option_value: equipOption.option_value,
    });

    return this.getUserEquipOptionRepository(qr).find({ where: { user_id } });
  }

  async equipMaxLevelUpOptionUpdate(
    user_id: string,
    origin_equip_id: number,
    qr?: QueryRunner,
  ) {
    // if (!user_id || typeof user_id !== 'string') {
    //   throw new BadRequestException('Invalid user_id provided.');
    // }
    // if (!equip_id || isNaN(equip_id)) {
    //   throw new BadRequestException('Invalid equip_id provided.');
    // }

    const userEquipOptionRepository = this.getUserEquipOptionRepository(qr);
    const userEquipOption = await userEquipOptionRepository.find({
      where: {
        user_id,
        origin_equip_id,
      },
    });

    const equipOptionList = await this.equipOptionService.getEquipOptionList(
      origin_equip_id,
      qr,
    );

    for (const equipOption of equipOptionList) {
      console.log(`equipOption: ${equipOption}`);
      await this.userEquipOptionRepository.save({
        userEquipOption,
        origin_equip_id,
        option_grade: equipOption.option_grade,
        option_type: equipOption.option_type,
        option_value: equipOption.option_value,
      });
    }

    return this.userEquipOptionRepository.find({ where: { user_id } });
  }

  async equipOptionList(user_id: string, qr?: QueryRunner) {
    const userEquipOptionRepository = this.getUserEquipOptionRepository(qr);
    const userEquipOption = await userEquipOptionRepository.find({
      where: {
        user_id,
      },
    });

    return userEquipOption;
  }
}
