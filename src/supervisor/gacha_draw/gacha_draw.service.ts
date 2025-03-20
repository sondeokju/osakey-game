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
import { UserChallengeService } from 'src/inventory/challenge/user_challenge/user_challenge.service';
import { UserEquipService } from 'src/inventory/equipment/user_equip/user_equip.service';
import { GameLogsService } from 'src/game_log/game_logs/game_logs.service';
import { LogType } from 'src/common/const/log-type.enum';

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
    private readonly userChallengeService: UserChallengeService,
    private readonly userEquipService: UserEquipService,
    private readonly dataSource: DataSource,
    private readonly gameLogsService: GameLogsService,
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

  async gacha(
    user_id: string,
    gacha_id: number,
    gacha_count: number,
    qr?: QueryRunner,
  ) {
    if (+gacha_count === 1) {
      return await this.equipGachaDrawRandom(
        user_id,
        gacha_id,
        gacha_count,
        qr,
      );
    } else if (+gacha_count === 10) {
      return await this.gacha10(user_id, gacha_id, gacha_count, qr);
    }
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
    let random = Math.random() * totalWeight;

    for (const gacha of gachaList) {
      random -= gacha.item_rate;
      if (random <= 0) {
        return {
          item_id: gacha.item_id,
          item_kind: gacha.item_kind,
          item_count: gacha.item_qty,
        };
      }
    }

    return { item_id: null, item_kind: null, item_count: null };
  }

  async calculEquipGachaDrawRandom10(gacha_id: number, qr?: QueryRunner) {
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
          items: Array(gacha.item_qty)
            .fill(null)
            .map(() => ({
              item_id: gacha.item_id,
              item_type: gacha.item_kind,
              item_count: gacha.item_qty,
            })),
        };
      }
    }

    return { items: [] };
  }
  async itemGradeCheck(
    items: number[],
    item_grade: number,
    gacha_type: string,
    qr?: QueryRunner,
  ) {
    let itemDataList;

    if (gacha_type === 'E') {
      itemDataList = await Promise.all(
        items.map((item) => this.equipService.getEquip(item, qr)),
      );
      return itemDataList.some(
        (itemData) => itemData.equip_grade === item_grade,
      );
    }

    if (['M', 'S'].includes(gacha_type)) {
      itemDataList = await Promise.all(
        items.map((item) => this.itemService.getItem(item, qr)),
      );
      return itemDataList.some(
        (itemData) => itemData.item_grade === item_grade,
      );
    }

    return false;
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
    gacha_type: string,
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
            (go.item_kind = ? AND e.equip_grade = ?)            
        )
        ORDER BY RAND()
        LIMIT 1;
    `;

    const params = [gacha_id, gacha_type, item_grade];

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
      } else {
        itemData = await this.itemService.getItem(item, qr);
        item_grade = itemData.item_grade;
      }

      if (item_grade === gachaCostData.fixed_item_grade_1) {
        console.log(
          'gachaCostData.fixed_item_grade_1_count:',
          gachaCostData.fixed_item_grade_1_count,
        );
        await this.userGachaCheckService.gachaDrawReset(
          user_id,
          gacha_id,
          gachaCostData.fixed_item_grade_1,
          gachaCostData.fixed_item_grade_1_count,
          qr,
        );
      } else if (item_grade === gachaCostData.fixed_item_grade_2) {
        console.log(
          'gachaCostData.fixed_item_grade_2_count:',
          gachaCostData.fixed_item_grade_2_count,
        );
        await this.userGachaCheckService.gachaDrawReset(
          user_id,
          gacha_id,
          gachaCostData.fixed_item_grade_2,
          gachaCostData.fixed_item_grade_2_count,
          qr,
        );
      }
    }

    if (
      !grade4 &&
      gachaCheckData.fixed_item_grade_1_count <= 1 &&
      gachaCheckData.fixed_item_grade_2_count > 1
    ) {
      const gradeRandomData = await this.itemGradeRandom(
        gacha_id,
        gachaCostData.fixed_item_grade_1,
        gacha_type,
        qr,
      );
      if (gradeRandomData) {
        // 기존 아이템 중 무작위로 하나 선택하여 교체
        const replaceIndex = Math.floor(Math.random() * gachaItem.length);
        gachaItem[replaceIndex] = gradeRandomData.item_id;
      }

      await this.userGachaCheckService.gachaDrawReset(
        user_id,
        gacha_id,
        gachaCostData.fixed_item_grade_1,
        gachaCostData.fixed_item_grade_1_count,
        qr,
      );
    }

    if (
      !grade5 &&
      gachaCheckData.fixed_item_grade_2_count <= 1 &&
      gachaCheckData.fixed_item_grade_1_count > 1
    ) {
      const gradeRandomData = await this.itemGradeRandom(
        gacha_id,
        gachaCostData.fixed_item_grade_2,
        gacha_type,
        qr,
      );
      if (gradeRandomData) {
        // 기존 아이템 중 무작위로 하나 선택하여 교체
        const replaceIndex = Math.floor(Math.random() * gachaItem.length);
        gachaItem[replaceIndex] = gradeRandomData.item_id;
      }

      await this.userGachaCheckService.gachaDrawReset(
        user_id,
        gacha_id,
        gachaCostData.fixed_item_grade_2,
        gachaCostData.fixed_item_grade_2_count,
        qr,
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
    const calcuGachaItem = await this.calculEquipGachaDrawRandom(gacha_id);
    let gachaItem = [];
    gachaItem.push(calcuGachaItem.item_id);
    const itemKind = calcuGachaItem.item_kind;
    const itemCount = calcuGachaItem.item_count;
    const gachaCostData = await this.gachaService.getGacha(gacha_id, qr);

    await this.userGachaCheckService.defaultGachaCountSetting(
      user_id,
      gacha_id,
      gachaCostData.fixed_item_grade_1_count,
      gachaCostData.fixed_item_grade_2_count,
      qr,
    );

    let costItemCount = gachaCostData.item_id_1_count;
    let diaPayout;

    diaPayout = await this.resourceManagerService.validateAndDeductResources(
      user_id,
      {
        item: {
          item_id: gachaCostData.item_id_1,
          count: gachaCostData.item_id_1_count,
        },
      },
      qr,
    );

    if (!diaPayout.hasError && gachaCostData.gacha_id != 11720001) {
      costItemCount = 0;
      diaPayout = await this.resourceManagerService.validateAndDeductResources(
        user_id,
        {
          dia: {
            amount: gachaCostData.dia_1,
            mode: 'mixed',
          },
        },
        qr,
      );
    }

    if (!diaPayout.hasError) {
      return diaPayout;
    }

    gachaItem = await this.fixedGacha(
      user_id,
      gacha_id,
      gachaItem,
      gachaCostData,
      calcuGachaItem.item_kind,
      qr,
    );

    // const itemCountMap: Record<number, number> = {};
    // for (const item_id of gachaItem) {
    //   itemCountMap[item_id] = (itemCountMap[item_id] || 0) + 1;
    // }

    // 중복된 item_id를 합쳐서 { item_id, item_count } 형태로 변환
    //const gachaItemData: { item_id: number; item_count: number }[] = [];
    const gachaItemData: { item_id: number; item_count: number }[] = [];
    const gachaEquipData: { equip_id: number; equip_count: number }[] = [];
    const userEquip = [];

    //let reward;
    if (['E'].includes(itemKind)) {
      await this.rewardOfferService.rewardEquipArray(user_id, gachaItem, qr);

      gachaEquipData.push({
        equip_id: Number(gachaItem[0].item_id),
        equip_count: Number(itemCount),
      });

      const equip = await this.userEquipService.getUserLastInsertEquip(
        user_id,
        Number(gachaItem[0].item_id),
        qr,
      );

      userEquip.push(equip);
    } else if (['M', 'S'].includes(itemKind)) {
      await this.rewardOfferService.rewardItem(
        user_id,
        gachaItem[0].item_id,
        itemCount,
        qr,
      );

      gachaItemData.push({
        item_id: Number(gachaItem[0].item_id),
        item_count: Number(itemCount),
      });
    }

    // 뽑기 횟수 퀘스트
    await this.userChallengeService.challengeQuest(user_id, 12400002, 1);

    // 가챠 로그
    const gachaLog = {
      userItemData: gachaItemData,
      userEquipData: userEquip,
      deductedCurrency: [
        {
          // item
          item_id: gachaCostData.item_id_1,
          item_count: costItemCount,
        },
        {
          // diamond_paid
          item_id: 11100003,
          item_count: diaPayout.reduceItem.diamond_paid ?? 0,
        },
        {
          // diamond_free
          item_id: 11100004,
          item_count: diaPayout.reduceItem.diamond_free ?? 0,
        },
      ],
    };

    await this.gameLogsService.insertLog(LogType.GACHA_01, user_id, gachaLog);

    return {
      reward: {
        userItemData: gachaItemData,
        userEquipData: userEquip,
      },
      deductedCurrency: [
        {
          // item
          item_id: gachaCostData.item_id_1,
          item_count: costItemCount,
        },
        {
          // diamond_paid
          item_id: 11100003,
          item_count: diaPayout.reduceItem.diamond_paid ?? 0,
        },
        {
          // diamond_free
          item_id: 11100004,
          item_count: diaPayout.reduceItem.diamond_free ?? 0,
        },
      ],
    };
  }

  // async equipGachaDrawRandom(
  //   user_id: string,
  //   gacha_id: number,
  //   gacha_count: number,
  //   qr?: QueryRunner,
  // ) {
  //   // if (gacha_count === 1) {

  //   // } else if (gacha_count === 10) {
  //   // }

  //   const calcuGachaItem = await this.calculEquipGachaDrawRandom(gacha_id);
  //   let gachaItem = calcuGachaItem.items;
  //   const itemKind = calcuGachaItem.item_kind;
  //   const gachaCostData = await this.gachaService.getGacha(gacha_id, qr);

  //   await this.userGachaCheckService.defaultGachaCountSetting(
  //     user_id,
  //     gacha_id,
  //     gachaCostData.fixed_item_grade_1_count,
  //     gachaCostData.fixed_item_grade_2_count,
  //     qr,
  //   );

  //   // 11100003, C, 1, CUR_DIA_PAID, diamond_paid;
  //   // 11100004, C, 1, CUR_DIA_FREE, diamond_free;

  //   const diaPayout =
  //     await this.resourceManagerService.validateAndDeductResources(
  //       user_id,
  //       {
  //         dia: {
  //           amount: gachaCostData.dia_1,
  //           mode: 'mixed',
  //         },
  //         item: {
  //           item_id: gachaCostData.item_id_1,
  //           count: gachaCostData.item_id_1_count,
  //         },
  //       },
  //       qr,
  //     );

  //   if (!diaPayout.hasError) {
  //     return diaPayout;
  //   }
  //   console.log('diaPayout:', diaPayout);
  //   gachaItem = await this.fixedGacha(
  //     user_id,
  //     gacha_id,
  //     gachaItem,
  //     gachaCostData,
  //     calcuGachaItem.item_kind,
  //     qr,
  //   );

  //   const itemCountMap: Record<number, number> = {};
  //   for (const item_id of gachaItem) {
  //     itemCountMap[item_id] = (itemCountMap[item_id] || 0) + 1;
  //   }

  //   // 중복된 item_id를 합쳐서 { item_id, item_count } 형태로 변환
  //   //const gachaItemData: { item_id: number; item_count: number }[] = [];
  //   const gachaItemData: { item_id: number; item_count: number }[] = [];
  //   const gachaEquipData: { equip_id: number; equip_count: number }[] = [];
  //   const userEquip = [];

  //   //let reward;
  //   if (['E'].includes(itemKind)) {
  //     await this.rewardOfferService.rewardEquipArray(user_id, gachaItem, qr);

  //     // 객체를 원하는 형태의 배열로 변환
  //     for (const [item_id, item_count] of Object.entries(itemCountMap)) {
  //       gachaEquipData.push({
  //         equip_id: Number(item_id),
  //         equip_count: Number(item_count),
  //       });

  //       const equip = await this.userEquipService.getUserLastInsertEquip(
  //         user_id,
  //         Number(item_id),
  //         qr,
  //       );

  //       userEquip.push(equip);
  //     }
  //   } else if (['M', 'S'].includes(itemKind)) {
  //     await this.rewardOfferService.rewardSameItemNumberArray(
  //       user_id,
  //       gachaItem,
  //       qr,
  //     );

  //     // 객체를 원하는 형태의 배열로 변환
  //     for (const [item_id, item_count] of Object.entries(itemCountMap)) {
  //       gachaItemData.push({
  //         item_id: Number(item_id),
  //         item_count: Number(item_count),
  //       });
  //     }
  //   }

  //   // 뽑기 횟수 퀘스트
  //   await this.userChallengeService.challengeQuest(user_id, 12400002, 1);

  //   return {
  //     reward: {
  //       userItemData: gachaItemData,
  //       userEquipData: userEquip,
  //     },
  //     deductedCurrency: [
  //       {
  //         // item
  //         item_id: gachaCostData.item_id_1,
  //         item_count: gachaCostData.item_id_1_count,
  //       },
  //       {
  //         // diamond_paid
  //         item_id: 11100003,
  //         item_count: diaPayout.reduceItem.diamond_paid ?? 0,
  //       },
  //       {
  //         // diamond_free
  //         item_id: 11100004,
  //         item_count: diaPayout.reduceItem.diamond_free ?? 0,
  //       },
  //     ],
  //   };
  // }

  async gacha10(
    user_id: string,
    gacha_id: number,
    gacha_count: number,
    qr?: QueryRunner,
  ) {
    //const itemCountMap: Record<number, number> = {};
    const calcuResult = [];

    for (let i = 0; i < 10; i++) {
      const calcuGachaItem = await this.calculEquipGachaDrawRandom10(gacha_id);
      //console.log('calcuGachaItem:', calcuGachaItem);
      calcuResult.push(calcuGachaItem.items[0]);
    }

    //console.log('calculEquipGachaDrawRandom10:', calcuResult);
    // 뽑기 횟수 퀘스트
    await this.userChallengeService.challengeQuest(user_id, 12400002, 10);
    const gachaCostData = await this.gachaService.getGacha(gacha_id, qr);

    await this.userGachaCheckService.defaultGachaCountSetting10(
      user_id,
      gacha_id,
      gachaCostData.fixed_item_grade_1_count,
      gachaCostData.fixed_item_grade_2_count,
      qr,
    );

    let costItemCount = gachaCostData.item_id_10_count;
    let diaPayout;

    diaPayout = await this.resourceManagerService.validateAndDeductResources(
      user_id,
      {
        item: {
          item_id: gachaCostData.item_id_1,
          count: gachaCostData.item_id_10_count,
        },
      },
      qr,
    );

    // if (!diaPayout.hasError && gachaCostData.gacha_id === 11720001) {
    //   return diaPayout;
    // }

    if (
      !diaPayout.hasError &&
      !diaPayout.reduceItem &&
      gachaCostData.gacha_id != 11720001
    ) {
      costItemCount = 0;
      diaPayout = await this.resourceManagerService.validateAndDeductResources(
        user_id,
        {
          dia: {
            amount: gachaCostData.dia_10,
            mode: 'mixed',
          },
        },
        qr,
      );
    }

    if (!diaPayout.hasError || !diaPayout.reduceItem) {
      return diaPayout;
    }

    // 중복된 item_id를 합쳐서 { item_id, item_count } 형태로 변환
    const gachaItemData: { item_id: number; item_count: number }[] = [];
    const userEquip = [];

    for (let i = 0; i < calcuResult.length; i++) {
      //const itemId = calcuResult[i].item_id;
      const itemType = String(calcuResult[i].item_type);
      const item = [];
      item.push(calcuResult[i].item_id);

      const fixedGacha = await this.fixedGacha(
        user_id,
        gacha_id,
        item,
        gachaCostData,
        itemType,
        qr,
      );

      if (['E'].includes(itemType)) {
        const result = await this.rewardOfferService.createEquipQuery(
          user_id,
          +fixedGacha[0],
          qr,
        );

        userEquip.push(result);
      } else if (['M', 'S'].includes(itemType)) {
        await this.rewardOfferService.rewardItem(
          user_id,
          +fixedGacha[0],
          calcuResult[i].item_count,
          qr,
        );

        gachaItemData.push({
          item_id: fixedGacha[0],
          item_count: calcuResult[i].item_count,
        });
      }
    }

    // 가챠 로그
    const gachaLog = {
      userItemData: gachaItemData,
      userEquipData: userEquip,
      deductedCurrency: [
        {
          // item
          item_id: gachaCostData.item_id_10,
          item_count: costItemCount,
        },
        {
          // diamond_paid
          item_id: 11100003,
          item_count: diaPayout.reduceItem.diamond_paid ?? 0,
        },
        {
          // diamond_free
          item_id: 11100004,
          item_count: diaPayout.reduceItem.diamond_free ?? 0,
        },
      ],
    };

    await this.gameLogsService.insertLog(LogType.GACHA_01, user_id, gachaLog);

    return {
      reward: {
        userItemData: gachaItemData,
        userEquipData: userEquip,
      },
      deductedCurrency: [
        {
          // item
          item_id: gachaCostData.item_id_10,
          item_count: costItemCount,
        },
        {
          // diamond_paid
          item_id: 11100003,
          item_count: diaPayout.reduceItem.diamond_paid ?? 0,
        },
        {
          // diamond_free
          item_id: 11100004,
          item_count: diaPayout.reduceItem.diamond_free ?? 0,
        },
      ],
    };
  }

  // async equipGachaDraw10Random(
  //   user_id: string,
  //   gacha_id: number,
  //   //gacha_count?: number,
  //   qr?: QueryRunner,
  // ) {
  //   const gachaCostData = await this.gachaService.getGacha(gacha_id, qr);
  //   let gachaItems: number[] = [];
  //   let itemKind: string | null = null;
  //   const gacha_count = 10;

  //   for (let i = 0; i < gacha_count; i++) {
  //     const calcuGachaItem = await this.calculEquipGachaDrawRandom(gacha_id);
  //     gachaItems.push(...calcuGachaItem.item_id);
  //     if (!itemKind) {
  //       itemKind = calcuGachaItem.item_kind; // 첫 번째 아이템의 종류를 저장
  //     }
  //   }

  //   await this.resourceManagerService.validateAndDeductResources(
  //     user_id,
  //     {
  //       dia: {
  //         amount: gachaCostData.dia_1 * gacha_count, // 가챠 횟수만큼 비용 적용
  //         mode: 'mixed',
  //       },
  //       item: {
  //         item_id: gachaCostData.item_id_1,
  //         count: gachaCostData.item_id_1_count * gacha_count, // 가챠 횟수만큼 비용 적용
  //       },
  //     },
  //     qr,
  //   );

  //   let reward;
  //   if (['E'].includes(itemKind)) {
  //     reward = await this.rewardOfferService.rewardEquipArray(
  //       user_id,
  //       gachaItems,
  //       qr,
  //     );
  //   } else if (['M', 'S'].includes(itemKind)) {
  //     reward = await this.rewardOfferService.rewardSameItemNumberArray(
  //       user_id,
  //       gachaItems,
  //       qr,
  //     );
  //   }

  //   console.log('reward', reward);

  //   if (!reward) {
  //     throw new BadRequestException('Failed to process reward.');
  //   }

  //   return { gachaItems, reward };
  // }

  async diamondDivision(resourceCheck: any, qr?: QueryRunner) {
    let deductedCurrency = [];
    const price_kind = 'diamond_mix';

    if (price_kind === 'diamond_mix') {
      const diamond_free_item_id = 11100004;
      const dia_free = await this.itemService.getItem(diamond_free_item_id, qr);

      const diamond_paid_item_id = 11100003;
      const dia_paid = await this.itemService.getItem(diamond_paid_item_id, qr);

      deductedCurrency = [
        {
          item_id: dia_free.item_id,
          item_count: resourceCheck['reduceItem'].diamond_free,
        },
        {
          item_id: dia_paid.item_id,
          item_count: resourceCheck['reduceItem'].diamond_paid,
        },
      ];
    } else if (price_kind === 'diamond_free') {
      const diamond_free_item_id = 11100004;
      const item = await this.itemService.getItem(diamond_free_item_id, qr);

      deductedCurrency = [
        {
          item_id: item.item_id,
          item_count: 0,
        },
      ];
    } else if (price_kind === 'diamond_paid') {
      const diamond_paid_item_id = 11100003;
      const item = await this.itemService.getItem(diamond_paid_item_id, qr);

      deductedCurrency = [
        {
          item_id: item.item_id,
          item_count: 0,
        },
      ];
    } else if (price_kind === 'gord') {
      const item_id = 11100002;
      const item = await this.itemService.getItem(item_id, qr);

      deductedCurrency = [
        {
          item_id: item.item_id,
          item_count: 0,
        },
      ];
    }

    return deductedCurrency;
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
