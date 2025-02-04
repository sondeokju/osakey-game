import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
//import { ItemService } from 'src/static-table/item/item.service';
import { GachaService } from 'src/static-table/draw/gacha/gacha.service';
import { GachaOutputService } from 'src/static-table/draw/gacha_output/gacha_output.service';

@Injectable()
export class GachaDrawService {
  constructor(
    private readonly rewardOfferService: RewardOfferService,
    //private readonly itemService: ItemService,
    private readonly gachaService: GachaService,
    private readonly gachaOutputService: GachaOutputService,
    private readonly dataSource: DataSource,
  ) {}

  async calculEquipRandom(gacha_id: number, qr?: QueryRunner) {
    const gachaList = await this.gachaOutputService.getGachaOutputList(
      gacha_id,
      qr,
    );

    const totalWeight = gachaList.reduce(
      (sum, gacha) => sum + gacha.item_rate,
      0,
    );

    const rawRandom = Math.random(); // 난수 생성
    let random = rawRandom * totalWeight;

    for (const gacha of gachaList) {
      if (random < gacha.item_rate) {
        return gacha.item_id;
      }
      random -= gacha.item_rate;
    }

    return gachaList[gachaList.length - 1].item_id;
  }

  async equipRandom(user_id: string, gacha_id: number, qr?: QueryRunner) {
    const gachaItem = await this.calculEquipRandom(gacha_id);

    console.log('gachaItem', gachaItem);

    return gachaItem;
  }
}
