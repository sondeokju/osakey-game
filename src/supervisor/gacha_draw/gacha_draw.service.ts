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

  async calculEquipGachaDrawRandom(gacha_id: number, qr?: QueryRunner) {
    const gachaList = await this.gachaOutputService.getGachaOutputList(
      gacha_id,
      qr,
    );

    const totalWeight = gachaList.reduce(
      (sum, gacha) => sum + gacha.item_rate,
      0,
    );

    const selectedItems: number[] = [];

    const drawItem = () => {
      let random = Math.random() * totalWeight;
      for (const gacha of gachaList) {
        if (random < gacha.item_rate) {
          return gacha;
        }
        random -= gacha.item_rate;
      }
      return gachaList[gachaList.length - 1];
    };

    const resultMap = new Map<number, number>();

    while (selectedItems.length < 2) {
      // item_qty가 2 이상이면 여러 개 뽑음
      const selectedGacha = drawItem();
      const { item_id, item_qty } = selectedGacha;

      if (!resultMap.has(item_id)) {
        resultMap.set(item_id, 0);
      }
      resultMap.set(item_id, resultMap.get(item_id)! + 1);

      if (resultMap.get(item_id)! >= item_qty) {
        selectedItems.push(item_id);
      }
    }

    return selectedItems;
  }

  async calculEquipGachaDrawRandom2(gacha_id: number, qr?: QueryRunner) {
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

  async equipGachaDrawRandom(
    user_id: string,
    gacha_id: number,
    qr?: QueryRunner,
  ) {
    const gachaItem = await this.calculEquipGachaDrawRandom(gacha_id);

    console.log('gachaItem', gachaItem);

    return gachaItem;
  }
}
