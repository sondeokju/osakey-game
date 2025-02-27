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
import { UserGachaCheckService } from './user_gacha_check/user_gacha_check.service';
import { ItemService } from 'src/static-table/item/item.service';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { ResourceManagerService } from '../resource_manager/resource_manager.service';

@Injectable()
export class GachaDrawService {
  constructor(
    private readonly rewardOfferService: RewardOfferService,
    private readonly itemService: ItemService,
    private readonly gachaService: GachaService,
    private readonly gachaOutputService: GachaOutputService,
    private readonly userGachaCheckService: UserGachaCheckService,
    private readonly equipService: EquipService,
    private readonly resourceManagerService: ResourceManagerService,
    private readonly dataSource: DataSource,
  ) {}

  // async simulateGachaDraws(
  //   gacha_id: number,
  //   iterations: number = 1000,
  //   qr?: QueryRunner,
  // ) {
  //   const resultCount: Record<number, number> = {};

  //   if (iterations > 5000) {
  //     iterations = 5000;
  //   }
  //   for (let i = 0; i < iterations; i++) {
  //     const drawResult = await this.calculEquipGachaDrawRandom(gacha_id, qr);
  //     drawResult.forEach((item_id) => {
  //       resultCount[item_id] = (resultCount[item_id] || 0) + 1;
  //     });
  //   }

  //   //console.log('Simulation Results:', resultCount);
  //   return resultCount;
  // }

  async calculEquipGachaDrawRandom(gacha_id: number, qr?: QueryRunner) {
    const gachaList = await this.gachaOutputService.getGachaOutputList(
      gacha_id,
      qr,
    );
    const totalWeight = gachaList.reduce(
      (sum, gacha) => sum + gacha.item_rate,
      0,
    );
    let random = Math.random() * totalWeight;

    for (const gacha of gachaList) {
      random -= gacha.item_rate;
      if (random <= 0) {
        return {
          items: Array(gacha.item_qty).fill(gacha.item_id),
          item_kind: gacha.item_kind,
        };
      }
    }

    return { items: [], item_kind: null };
  }

  async itemGradeCheck(
    items: number[],
    item_grade: number,
    gacha_type: string,
    qr?: QueryRunner,
  ) {
    if (gacha_type === 'E') {
      const itemDataList = await Promise.all(
        items.map((item) => this.equipService.getEquip(item, qr)),
      );
      return itemDataList.some(
        (itemData) => itemData.equip_grade === item_grade,
      );
    } else if (gacha_type === 'M') {
      const itemDataList = await Promise.all(
        items.map((item) => this.itemService.getItem(item, qr)),
      );
      return itemDataList.some(
        (itemData) => itemData.item_grade === item_grade,
      );
    }
  }

  // async itemGradeCheck(items: number[], item_grade: number, qr?: QueryRunner) {
  //   const itemDataList = await Promise.all(
  //     items.map((item) => this.itemService.getItem(item, qr)),
  //   );
  //   return itemDataList.some((itemData) => itemData.item_grade === item_grade);
  // }

  async itemGradeRandom(
    gacha_id: number,
    item_grade: number,
    qr?: QueryRunner,
  ) {
    const query = `
        SELECT go.gacha_id, go.item_id, go.item_kind,
               CASE
                   WHEN go.item_kind = 'E' THEN e.equip_grade
                   WHEN go.item_kind = 'M' THEN i.item_grade
               END AS item_grade,
               e.equip_name,
               i.item_name
        FROM gacha_output go
        LEFT JOIN equip e ON go.item_kind = 'E' AND go.item_id = e.equip_id
        LEFT JOIN item i ON go.item_kind = 'M' AND go.item_id = i.item_id
        WHERE go.gacha_id = ?
        AND (
            (go.item_kind = 'E' AND e.equip_grade = ?)
            OR (go.item_kind = 'M' AND i.item_grade = ?)
        )
        ORDER BY RAND()
        LIMIT 1;
    `;

    const params = [gacha_id, item_grade, item_grade];

    let result;
    if (qr) {
      result = await qr.query(query, params);
    } else {
      result = await this.dataSource.query(query, params);
    }

    return result.length ? result[0] : null;
  }

  async fixedGacha(
    user_id: string,
    gacha_id: number,
    gachaItem: number[],
    gachaCostData: any,
    gacha_type: string,
    qr?: QueryRunner,
  ) {
    const gachaCheckData =
      await this.userGachaCheckService.getGachaDrawItemGrade(user_id, qr);

    console.log('gacha_id:', gacha_id);
    console.log('gachaItem:', gachaItem);
    console.log('gachaCostData:', gachaCostData);
    console.log('gacha_type:', gacha_type);
    const [grade4, grade5] = await Promise.all([
      this.itemGradeCheck(
        gachaItem,
        gachaCostData.fixed_item_grade_1,
        gacha_type,
        qr,
      ),
      this.itemGradeCheck(
        gachaItem,
        gachaCostData.fixed_item_grade_2,
        gacha_type,
        qr,
      ),
    ]);

    let itemData;
    let equipData;
    let item_grade = 0;
    for (const item of gachaItem) {
      if (['E'].includes(gacha_type)) {
        equipData = await this.equipService.getEquip(item, qr);
        item_grade = equipData.equip_grade;
        console.log('E item_grade:', item_grade);
      } else {
        itemData = await this.itemService.getItem(item, qr);
        item_grade = itemData.item_grade;
        console.log('M item_grade:', item_grade);
      }
      if (item_grade === gachaCostData.fixed_item_grade_1) {
        await this.userGachaCheckService.gachaDrawItemGradeSave(
          user_id,
          gachaCostData.fixed_item_grade_1,
          1,
          qr,
        );
      } else if (item_grade === gachaCostData.fixed_item_grade_2) {
        await this.userGachaCheckService.gachaDrawItemGradeSave(
          user_id,
          gachaCostData.fixed_item_grade_2,
          1,
          qr,
        );
      }
    }
    if (!grade4) {
      const gradeRandomData = await this.itemGradeRandom(
        gacha_id,
        gachaCostData.fixed_item_grade_1,
        qr,
      );
      if (gradeRandomData) {
        // 기존 아이템 중 무작위로 하나 선택하여 교체
        const replaceIndex = Math.floor(Math.random() * gachaItem.length);
        gachaItem[replaceIndex] = gradeRandomData.item_id;
      }
    }
    if (!grade5) {
      const gradeRandomData = await this.itemGradeRandom(
        gacha_id,
        gachaCostData.fixed_item_grade_2,
        qr,
      );
      if (gradeRandomData) {
        // 기존 아이템 중 무작위로 하나 선택하여 교체
        const replaceIndex = Math.floor(Math.random() * gachaItem.length);
        gachaItem[replaceIndex] = gradeRandomData.item_id;
      }
    }
    if (
      gachaCheckData.fixed_1_draw_count >=
      gachaCostData.fixed_item_grade_1_count
    ) {
      await this.userGachaCheckService.gachaDrawItemGradeReset(
        user_id,
        gachaCostData.fixed_item_grade_1,
      );
    }
    if (
      gachaCheckData.fixed_2_draw_count >=
      gachaCostData.fixed_item_grade_2_count
    ) {
      await this.userGachaCheckService.gachaDrawItemGradeReset(
        user_id,
        gachaCostData.fixed_item_grade_2,
      );
    }

    return gachaItem;
  }

  async equipGachaDrawRandom(
    user_id: string,
    gacha_id: number,
    gacha_count: number,
    qr?: QueryRunner,
  ) {
    // if (gacha_count === 1) {

    // } else if (gacha_count === 10) {
    // }

    const calcuGachaItem = await this.calculEquipGachaDrawRandom(gacha_id);
    const gachaItem = calcuGachaItem.items;
    const itemKind = calcuGachaItem.item_kind;
    const gachaCostData = await this.gachaService.getGacha(gacha_id, qr);

    await this.userGachaCheckService.defaultGachaCountSetting(
      user_id,
      gacha_id,
      gachaCostData.fixed_item_grade_1_count,
      gachaCostData.fixed_item_grade_2_count,
      qr,
    );
    await this.userGachaCheckService.gachaDrawCountPlus(user_id, qr);

    console.log('calcuGachaItem:', calcuGachaItem);
    console.log('gachaItem:', gachaItem);
    console.log('itemKind:', itemKind);
    console.log('gachaCostData:', gachaCostData);

    await this.resourceManagerService.validateAndDeductResources(
      user_id,
      {
        dia: {
          amount: gachaCostData.dia_1,
          mode: 'mixed',
        },
        item: {
          item_id: gachaCostData.item_id_1,
          count: gachaCostData.item_id_1_count,
        },
      },
      qr,
    );

    await this.fixedGacha(
      user_id,
      gacha_id,
      gachaItem,
      gachaCostData,
      calcuGachaItem.item_kind,
      qr,
    );

    // 중복된 item_id를 합쳐서 { item_id, item_count } 형태로 변환
    const gachaItemData: { item_id: number; item_count: number }[] = [];

    console.log(gachaItemData);

    let reward;
    if (['E'].includes(itemKind)) {
      reward = await this.rewardOfferService.rewardEquipArray(
        user_id,
        gachaItem,
        qr,
      );

      // reward = reward.map(({ item_count, ...rest }) => ({
      //   ...rest,
      //   item_count: item_count,
      // }));
    } else if (['M', 'S'].includes(itemKind)) {
      await this.rewardOfferService.rewardSameItemNumberArray(
        user_id,
        gachaItem,
        qr,
      );

      const itemCountMap: Record<number, number> = {};
      for (const item_id of gachaItem) {
        itemCountMap[item_id] = (itemCountMap[item_id] || 0) + 1;
      }

      // 객체를 원하는 형태의 배열로 변환
      for (const [item_id, item_count] of Object.entries(itemCountMap)) {
        gachaItemData.push({
          item_id: Number(item_id),
          item_count: Number(item_count),
        });
      }

      reward = {
        userItemData: gachaItemData,
      };
    }

    console.log('reward', reward);

    if (!reward) {
      //throw new BadRequestException('Failed to process reward.');
    }

    return { reward };
  }

  async equipGachaDraw10Random(
    user_id: string,
    gacha_id: number,
    //gacha_count?: number,
    qr?: QueryRunner,
  ) {
    const gachaCostData = await this.gachaService.getGacha(gacha_id, qr);
    let gachaItems: number[] = [];
    let itemKind: string | null = null;
    const gacha_count = 10;

    for (let i = 0; i < gacha_count; i++) {
      const calcuGachaItem = await this.calculEquipGachaDrawRandom(gacha_id);
      gachaItems.push(...calcuGachaItem.items);
      if (!itemKind) {
        itemKind = calcuGachaItem.item_kind; // 첫 번째 아이템의 종류를 저장
      }
    }

    await this.resourceManagerService.validateAndDeductResources(
      user_id,
      {
        dia: {
          amount: gachaCostData.dia_1 * gacha_count, // 가챠 횟수만큼 비용 적용
          mode: 'mixed',
        },
        item: {
          item_id: gachaCostData.item_id_1,
          count: gachaCostData.item_id_1_count * gacha_count, // 가챠 횟수만큼 비용 적용
        },
      },
      qr,
    );

    let reward;
    if (['E'].includes(itemKind)) {
      reward = await this.rewardOfferService.rewardEquipArray(
        user_id,
        gachaItems,
        qr,
      );
    } else if (['M', 'S'].includes(itemKind)) {
      reward = await this.rewardOfferService.rewardSameItemNumberArray(
        user_id,
        gachaItems,
        qr,
      );
    }

    console.log('reward', reward);

    if (!reward) {
      throw new BadRequestException('Failed to process reward.');
    }

    return { gachaItems, reward };
  }

  // async equipGachaDrawRandom(
  //   user_id: string,
  //   gacha_id: number,
  //   //gacha_count: number,
  //   qr?: QueryRunner,
  // ) {
  //   const calcuGachaItem = await this.calculEquipGachaDrawRandom(gacha_id);
  //   const gachaItem = calcuGachaItem.items;
  //   const itemKind = calcuGachaItem.item_kind;
  //   const gachaCostData = await this.gachaService.getGacha(gacha_id, qr);

  //   // if(gacha_count === 1) {

  //   // } else if (gacha_count === 10) {

  //   // }

  //   await this.resourceManagerService.validateAndDeductResources(
  //     user_id,
  //     {
  //       dia: {
  //         amount: gachaCostData.dia_1,
  //         mode: 'mixed',
  //       },
  //       item: {
  //         item_id: gachaCostData.item_id_1,
  //         count: gachaCostData.item_id_1_count,
  //       },
  //     },
  //     qr,
  //   );

  //   // 중복된 item_id를 합쳐서 { item_id, item_count } 형태로 변환
  //   const gachaItemData: { item_id: number; item_count: number }[] = [];

  //   console.log(gachaItemData);

  //   let reward;
  //   if (['E'].includes(itemKind)) {
  //     reward = await this.rewardOfferService.rewardEquipArray(
  //       user_id,
  //       gachaItem,
  //       qr,
  //     );

  //     // reward = reward.map(({ item_count, ...rest }) => ({
  //     //   ...rest,
  //     //   item_qty: item_count, // item_count 값을 qty로 변경
  //     // }));
  //   } else if (['M', 'S'].includes(itemKind)) {
  //     await this.rewardOfferService.rewardSameItemNumberArray(
  //       user_id,
  //       gachaItem,
  //       qr,
  //     );

  //     const itemCountMap: Record<number, number> = {};
  //     for (const item_id of gachaItem) {
  //       itemCountMap[item_id] = (itemCountMap[item_id] || 0) + 1;
  //     }

  //     // 객체를 원하는 형태의 배열로 변환
  //     for (const [item_id, item_count] of Object.entries(itemCountMap)) {
  //       gachaItemData.push({
  //         item_id: Number(item_id),
  //         item_count: Number(item_count),
  //       });
  //     }

  //     reward = {
  //       userItemData: gachaItemData,
  //     };
  //   }

  //   console.log('reward', reward);

  //   if (!reward) {
  //     //throw new BadRequestException('Failed to process reward.');
  //   }

  //   return { reward };
  // }
}
