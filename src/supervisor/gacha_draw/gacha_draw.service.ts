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

  async simulateGachaDraws(
    gacha_id: number,
    iterations: number = 1000,
    qr?: QueryRunner,
  ) {
    const resultCount: Record<number, number> = {};

    if (iterations > 5000) {
      iterations = 5000;
    }
    for (let i = 0; i < iterations; i++) {
      const drawResult = await this.calculEquipGachaDrawRandom(gacha_id, qr);
      drawResult.forEach((item_id) => {
        resultCount[item_id] = (resultCount[item_id] || 0) + 1;
      });
    }

    //console.log('Simulation Results:', resultCount);
    return resultCount;
  }

  async calculEquipGachaDrawRandom(gacha_id: number, qr?: QueryRunner) {
    const gachaList = await this.gachaOutputService.getGachaOutputList(
      gacha_id,
      qr,
    );

    const totalWeight = gachaList.reduce(
      (sum, gacha) => sum + gacha.item_rate,
      0,
    );

    //const selectedItems: number[] = [];

    let random = Math.random() * totalWeight;
    for (const gacha of gachaList) {
      if (random < gacha.item_rate) {
        return Array(gacha.item_qty).fill(gacha.item_id);
      }
      random -= gacha.item_rate;
    }

    return Array(gachaList[gachaList.length - 1].item_qty).fill(
      gachaList[gachaList.length - 1].item_id,
    );
  }

  async equipGachaDrawRandom(
    user_id: string,
    gacha_id: number,
    qr?: QueryRunner,
  ) {
    let rewardData = {};
    const gachaItem = await this.calculEquipGachaDrawRandom(gacha_id);

    const gachaList = await this.gachaOutputService.getGachaOutputList(
      gacha_id,
      qr,
    );

    console.log('gachaItem', gachaItem);

    if (['E'].includes(gachaList[0].item_kind)) {
      console.log('item_kind', gachaList[0].item_kind);
      rewardData = await this.rewardOfferService.rewardEquipArray(
        user_id,
        gachaItem,
        qr,
      );
    } else if (['M', 'S'].includes(gachaList[0].item_kind)) {
      await this.rewardOfferService.rewardSameItemArray(user_id, gachaItem);
    }

    if (!rewardData) {
      throw new BadRequestException('Failed to process reward.');
    }

    return {
      gachaItem,
      rewardData,
    };
  }
}
