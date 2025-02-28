import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserDispatchRentama } from './entities/user_dispatch_rentama.entity';
import { DispatchService } from 'src/static-table/dispatch/dispatch/dispatch.service';
import { ItemService } from 'src/static-table/item/item.service';
import { DispatchUpgradeService } from 'src/static-table/dispatch/dispatch_upgrade/dispatch_upgrade.service';
import { ResourceManagerService } from 'src/supervisor/resource_manager/resource_manager.service';

@Injectable()
export class UserDispatchRentamaService {
  constructor(
    @InjectRepository(UserDispatchRentama)
    private readonly userDispatchRentamaRepository: Repository<UserDispatchRentama>,
    private readonly dispatchService: DispatchService,
    private readonly itemService: ItemService,
    private readonly dispatchUpgradeService: DispatchUpgradeService,
    private readonly resourceManagerService: ResourceManagerService,
  ) {}

  getUserDispatchRentamaRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserDispatchRentama>(UserDispatchRentama)
      : this.userDispatchRentamaRepository;
  }

  async dispatchUpgrade(
    user_id: string,
    item_id: number,
    suit_piece_count: number,
    qr?: QueryRunner,
  ) {
    const userDispatchRentamaRepository =
      this.getUserDispatchRentamaRepository(qr);
    const userDispatchRentama = await userDispatchRentamaRepository.findOne({
      where: {
        user_id,
      },
    });

    const item = await this.itemService.getItem(item_id, qr);
    const dispatchUpgrade =
      await this.dispatchUpgradeService.getDispatchUpgradeId(
        item.item_grade,
        qr,
      );

    const upgradeTotalExp = +dispatchUpgrade.exp_qty * +suit_piece_count;
    const levelUpExp =
      upgradeTotalExp + userDispatchRentama.current_rentama_exp;

    const dispatch = await this.dispatchService.getDispatchLevel(
      levelUpExp,
      qr,
    );

    userDispatchRentama.rentama_level = dispatch.id;
    userDispatchRentama.current_rentama_exp = levelUpExp;

    const result =
      await userDispatchRentamaRepository.save(userDispatchRentama);

    await this.resourceManagerService.validateAndDeductResources(
      user_id,
      {
        //gord: equipLevel.require_gold,
        item: {
          item_id: item_id,
          count: suit_piece_count,
        },
      },
      qr,
    );

    return {
      // reward: {
      //   userItemData: shopRewardData,
      // },
      userDispatchRentama: result,
      deductedCurrency: [
        {
          item_id: item_id,
          item_count: suit_piece_count,
        },
      ],
    };
  }

  async getUserDispatchRentama(user_id: string, qr?: QueryRunner) {
    const userDispatchRentamaRepository =
      this.getUserDispatchRentamaRepository(qr);
    const result = await userDispatchRentamaRepository.findOne({
      where: {
        user_id,
      },
    });

    return result;
  }

  async getUserDispatchRentamaList(user_id: string, qr?: QueryRunner) {
    const userDispatchRentamaRepository =
      this.getUserDispatchRentamaRepository(qr);
    const result = await userDispatchRentamaRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }
}
