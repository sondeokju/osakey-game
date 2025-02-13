import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  In,
  QueryRunner,
  QueryRunnerProviderAlreadyReleasedError,
  Repository,
} from 'typeorm';
import { UserEquip } from './entities/user_equip.entity';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { EquipLevelService } from 'src/static-table/equipment/equip_level/equip_level.service';
import { UserEquipSlotService } from '../user_equip_slot/user_equip_slot.service';
import { UserEquipOptionService } from '../user_equip_option/user_equip_option.service';
import { EquipGradeService } from 'src/static-table/equipment/equip_grade/equip_grade.service';
import { ResourceManagerService } from 'src/supervisor/resource_manager/resource_manager.service';
import { DataSource } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { SkillService } from 'src/static-table/skill/skill/skill.service';

interface EquipMaxLevelData {
  equip_slot: string;
  equip_grade: string;
  max_level: number;
}

@Injectable()
export class UserEquipService {
  constructor(
    @InjectRepository(UserEquip)
    private readonly userEquipRepository: Repository<UserEquip>,
    private readonly equipService: EquipService,
    private readonly equipLevelService: EquipLevelService,
    private readonly userEquipSlotService: UserEquipSlotService,
    private readonly userEquipOptionService: UserEquipOptionService,
    private readonly equipGradeService: EquipGradeService,
    private readonly resourceManagerService: ResourceManagerService,
    private readonly dataSource: DataSource,
    private readonly rewardOfferService: RewardOfferService,
    private readonly skillService: SkillService,
  ) {}

  getUserEquipRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquip>(UserEquip)
      : this.userEquipRepository;
  }

  async simulateEquipSkillRandom(
    skill_equip_category: string,
    iterations: number,
    qr?: QueryRunner,
  ) {
    const resultCounts: Record<number, number> = {};

    if (iterations > 5000) {
      iterations = 5000;
    }

    for (let i = 0; i < iterations; i++) {
      const skillId = await this.calculEquipSkillRandom(
        skill_equip_category,
        qr,
      );
      //console.log('skillId', skillId);
      if (skillId !== null) {
        resultCounts[skillId] = (resultCounts[skillId] || 0) + 1;
        //console.log('resultCounts', resultCounts);
      }
    }

    //console.log('resultCounts', resultCounts);

    return resultCounts;
  }

  async calculEquipSkillRandom(skill_equip_category: string, qr?: QueryRunner) {
    const skills = await this.skillService.getSkillCategory(
      skill_equip_category,
      qr,
    );

    const totalWeight = skills.reduce(
      (sum, skill) => sum + skill.skill_equip_rate,
      0,
    );
    //console.log('totalWeight', totalWeight);

    const rawRandom = Math.random(); // 난수 생성
    //console.log('rawRandom', rawRandom);

    let random = rawRandom * totalWeight;
    //console.log('totalWeight', totalWeight, 'random', random);

    for (const skill of skills) {
      if (random < skill.skill_equip_rate) {
        return skill.skill_id;
      }
      random -= skill.skill_equip_rate;
    }

    return skills[skills.length - 1].skill_id;
  }

  async equipSkillRandomMount(
    user_id: string,
    user_equip_id: number,
    qr?: QueryRunner,
  ) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: { id: user_equip_id, user_id },
    });

    if (!userEquip) {
      throw new Error(
        `No matching UserEquip entries found for user_equip_id=${user_equip_id}`,
      );
    }

    const equip = await this.equipService.getEquip(userEquip.equip_id, qr);
    const equipSkillId = await this.calculEquipSkillRandom(equip.equip_slot);
    console.log('equipSkillId', equipSkillId);

    userEquip.equip_skill_id = equipSkillId;
    userEquip.skill_roll_count += 1;
    const result = await userEquipRepository.save(userEquip);

    return result;
  }

  async equipLevelReset(
    user_id: string,
    user_equip_id: number,
    qr?: QueryRunner,
  ) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: { id: user_equip_id, user_id },
    });

    if (!userEquip) {
      throw new Error(
        `No matching UserEquip entries found for user_equip_id=${user_equip_id}`,
      );
    }

    const equipLevelData = await this.equipLevelService.getEquipLevel(
      userEquip.equip_level_id,
    );

    userEquip.equip_level_id = +`${userEquip.equip_id}01`;
    const result = await userEquipRepository.save(userEquip);

    await this.rewardOfferService.rewardItem(
      user_id,
      equipLevelData.require_item_id,
      equipLevelData.used_item_total_count,
    );

    await this.rewardOfferService.rewardCurrency(
      user_id,
      'gord',
      equipLevelData.used_gold_total,
      qr,
    );

    return result;
  }

  async resetUserEquipMount(
    user_id: string,
    equipIds: number[],
    qr?: QueryRunner,
  ) {
    const userEquipRepository = this.getUserEquipRepository(qr);

    // 1. userEquip 테이블의 mount_yn을 모두 'N'으로 업데이트
    const userEquips = await userEquipRepository.findBy({
      user_id,
      equip_id: In(equipIds), // TypeORM의 In 연산자를 사용하여 여러 equip_id를 조회
    });

    if (userEquips.length === 0) {
      throw new Error(
        `No matching UserEquip entries found for user_id=${user_id}`,
      );
    }

    // 2. mount_yn 값을 'N'으로 업데이트
    const updatedUserEquips = userEquips.map((equip) => ({
      ...equip,
      mount_yn: 'N',
    }));

    // 3. 데이터 저장
    await userEquipRepository.save(updatedUserEquips);

    return {
      message:
        'Successfully updated mount_yn to N for all related UserEquip entries',
      updatedEquipIds: equipIds,
    };
  }

  async createEquip(user_id: string, equip_id: number, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }
    if (!equip_id || isNaN(equip_id)) {
      throw new BadRequestException('Invalid equip_id provided.');
    }

    const equip_level_id = `${equip_id}01`;
    const equipLevel = await this.equipLevelService.getEquipLevel(
      +equip_level_id,
      qr,
    );

    if (!equipLevel) {
      throw new NotFoundException(
        `Equip level with ID ${equip_level_id} not found.`,
      );
    }

    await this.getUserEquipRepository(qr).insert({
      user_id,
      equip_id,
      equip_level_id: equipLevel.equip_level_id,
    });

    return this.getUserEquipRepository(qr).find({ where: { user_id } });
  }

  async equipList(user_id: string, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.find({
      where: {
        user_id,
      },
    });

    return userEquip;
  }

  async equipMount(user_id: string, user_equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        id: user_equip_id,
      },
    });

    const equip_id = userEquip?.equip_id ?? 0;

    const result = await this.userEquipSlotService.equipSlotMount(
      user_id,
      user_equip_id,
      equip_id,
      qr,
    );
    return result;
  }

  async equipMountYN(user_id: string, user_equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        id: user_equip_id,
      },
    });

    const queryRunner = qr || this.dataSource.createQueryRunner();
    if (!qr) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    }

    const result = await queryRunner.query(
      `UPDATE user_equip SET mount_yn = 'Y' WHERE id = ? AND user_id = ?`,
      [user_equip_id, user_id], // 파라미터 바인딩
    );

    return result;
  }

  async equipLevelUp(user_id: string, user_equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: {
        id: user_equip_id,
        user_id,
      },
    });

    if (!userEquip) {
      throw new NotFoundException(
        `User equip with ID ${user_equip_id} not found.`,
      );
    }

    const equipLevel = await this.equipLevelService.getEquipLevel(
      userEquip.equip_level_id,
      qr,
    );

    console.log('userEquip.equip_level_id', userEquip.equip_level_id);
    console.log('equipLevel', equipLevel);

    const equip = await this.equipService.getEquip(userEquip.equip_id, qr);

    if (!equipLevel) {
      throw new NotFoundException(
        `Equip level with ID ${userEquip.equip_level_id} not found.`,
      );
    }

    // 최상 등급 확인
    const equip_grade = await this.equipGradeService.getEquipGrade('TRUE');
    if (
      parseInt(equipLevel.equip_grade, 10) === equip_grade.id &&
      equipLevel.level >= equipLevel.level_max
    ) {
      throw new BadRequestException(`It is already at the 5 maximum grade.`);
    }

    await this.resourceManagerService.validateAndDeductResources(
      user_id,
      {
        gord: equipLevel.require_gold,
        item: {
          item_id: equipLevel.require_item_id,
          count: equipLevel.require_item_count,
        },
      },
      qr,
    );

    //level up
    const nextLevel = this.levelUp(
      userEquip.equip_level_id,
      equipLevel.level_max,
    );

    const updateUserEquip = await userEquipRepository.save({
      ...userEquip,
      equip_level_id: nextLevel,
    });

    if (equipLevel.level === equipLevel.level_max) {
      await this.userEquipOptionService.equipOptionAdd(
        user_id,
        equip.origin_equip_id,
        equip.equip_grade + 1,
        qr,
      );
    }

    const userEquipData = await userEquipRepository.find({
      where: {
        user_id,
      },
    });

    const result = {
      reward: {
        userItemData: [
          {
            item_id: equipLevel.require_item_id,
            item_count: equipLevel.require_item_count,
          },
        ],
      },
      userEquipData,
    };

    return result;
  }

  async equipMaxLevelUp(
    user_id: string,
    user_equip_id: number,
    qr?: QueryRunner,
  ) {
    const userEquipRepository = this.getUserEquipRepository(qr);

    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        id: user_equip_id,
      },
    });

    if (!userEquip) {
      throw new NotFoundException(
        `User equip with ID ${user_equip_id} not found.`,
      );
    }

    const equipLevel = this.equipLevelService.getEquipLevel(
      userEquip.equip_level_id,
    );

    if (!equipLevel) {
      throw new NotFoundException(
        `Equip level with ID ${userEquip.equip_level_id} not found.`,
      );
    }

    const baseEquipId = await this.getBaseEquipId(userEquip.equip_level_id);
    const equip = await this.equipService.getEquip(baseEquipId, qr);

    // const equip_max_level_id = await this.getMaxEquipLevel(
    //   user_id,
    //   userEquip.equip_level_id,
    // );
    const equip_max_level_id = await this.maxEquipLevelUp(
      user_id,
      userEquip.equip_level_id,
    );

    const equipLevelMax = await this.equipLevelService.getEquipLevel(
      +equip_max_level_id,
      qr,
    );

    await this.resourceManagerService.validateAndDeductResources(
      user_id,
      {
        gord: equipLevelMax.used_gold_total,
        item: {
          item_id: equipLevelMax.require_item_id,
          count: equipLevelMax.require_item_count,
        },
      },
      qr,
    );

    const updatedUserEquip = await userEquipRepository.save({
      ...userEquip,
      equip_level_id: +equip_max_level_id,
    });

    await this.userEquipOptionService.equipMaxLevelUpOptionUpdate(
      user_id,
      equip.origin_equip_id,
      qr,
    );

    const userEquipData = await userEquipRepository.find({
      where: {
        user_id,
      },
    });

    return {
      reward: {
        userItemData: [
          {
            item_id: equipLevelMax.require_item_id,
            item_count: equipLevelMax.require_item_count,
          },
        ],
        userEquipData: userEquipData,
      },
    };
  }

  getMaxLevelId(currentLevelId: number): number {
    const levelString = currentLevelId.toString();
    const basePart = parseInt(levelString.slice(0, -2)) + 1;
    console.log('levelString', levelString);
    console.log('basePart', basePart);

    // 최대 레벨을 조합하여 새로운 ID 생성
    return parseInt(`${basePart}${'01'}`, 10);
  }

  getBaseEquipId(currentLevelId: number): number {
    const levelString = currentLevelId.toString();
    const basePart = parseInt(levelString.slice(0, -2));

    return basePart;
  }

  getEquipMaxLevelId(equipLevelId: number, levelMax: number): number {
    const levelString = equipLevelId.toString();
    const baseEquipLevel = parseInt(levelString.slice(0, -2));
    console.log('levelString', levelString);
    console.log('baseEquipLevel', baseEquipLevel);

    // 최대 레벨을 조합하여 새로운 ID 생성
    return parseInt(`${baseEquipLevel}${levelMax}`, 10);
  }

  async getMaxEquipLevel(
    userId: string,
    currentEquipLevelId: number,
  ): Promise<number | null> {
    const query = `      
      WITH RECURSIVE EquipUpgrade AS (
          -- 초기 장비 레벨 설정
          SELECT
              el.equip_level_id,
              el.require_gold,
              el.used_gold_total,
              el.used_item_total_count,
              el.require_item_id,
              el.require_item_count,
              u.gord AS current_gold,
              COALESCE(ui.item_count, 0) AS current_item_count
          FROM equip_level el
          JOIN users u ON u.user_id = ?
          LEFT JOIN user_item ui ON ui.user_id = u.user_id AND ui.item_id = el.require_item_id
          WHERE el.equip_level_id = ?

          UNION ALL

          -- 업그레이드 가능할 경우 다음 레벨을 가져옴
          SELECT
              el.equip_level_id,
              el.require_gold,
              el.used_gold_total,
              el.used_item_total_count,
              el.require_item_id,
              el.require_item_count,
              eu.current_gold,
              eu.current_item_count
          FROM equip_level el
          JOIN EquipUpgrade eu ON el.equip_level_id = eu.equip_level_id + 1
          WHERE eu.current_gold >= el.used_gold_total  -- 누적 골드 비교
            AND eu.current_item_count >= el.used_item_total_count  -- 누적 아이템 비교
            AND LEFT(el.equip_level_id, 8) = LEFT(eu.equip_level_id, 8) -- 같은 계열 내에서만 업그레이드 가능
      )

      -- 최대 업그레이드 가능한 레벨 찾기
      SELECT equip_level_id
      FROM EquipUpgrade
      ORDER BY equip_level_id DESC
      LIMIT 1;
    `;

    const result = await this.dataSource.query(query, [
      userId,
      currentEquipLevelId,
    ]);

    return result.length > 0 ? result[0].equip_level_id : null;
  }

  async getEquipLevelCategory(
    currentEquipLevelId: number,
  ): Promise<number | null> {
    const query = `      
      SELECT equip_level_id, level, require_gold
      FROM equip_level
      WHERE require_gold >= 0
      AND LEFT(equip_level_id, 8) = LEFT(?, 8)
    `;

    const result = await this.dataSource.query(query, [currentEquipLevelId]);

    return result;
  }

  async maxEquipLevelUp(user_id: string, equip_level_id: number) {
    const category = await this.getEquipLevelCategory(equip_level_id);

    console.log(category);
    console.log(Array.isArray(category)); // true이면 배열, false이면 배열이 아님

    // for (let i = 0; i < category.length; i++) {
    //   console.log(
    //     `레벨: ${category[i].level}, 필요 골드: ${category[i].require_gold}`,
    //   );
    // }
  }

  levelUp(currentLevelId: number, levelMax: number): number {
    const levelString = currentLevelId.toString();

    const basePart = levelString.slice(0, -2);
    const levelPart = levelString.slice(-2);

    const currentLevel = parseInt(levelPart, 10);

    let nextLevel: number;
    if (currentLevel >= levelMax) {
      return this.getMaxLevelId(currentLevelId);
    } else {
      nextLevel = currentLevel + 1;
      return parseInt(
        `${basePart}${nextLevel.toString().padStart(2, '0')}`,
        10,
      );
    }
  }

  async findBestEquip(user_id: string, qr?: QueryRunner) {
    // 외부에서 qr이 주어지지 않았다면 새로 생성
    const queryRunner = qr ?? this.dataSource.createQueryRunner();
    let shouldRelease = false;

    try {
      // 외부에서 제공된 qr이 아닌 경우에만 연결 및 트랜잭션 시작
      if (!qr) {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        shouldRelease = true; // qr을 내부적으로 생성했으므로, 후처리 필요
      }

      // 데이터 조회
      const bestEquipList = await queryRunner.manager
        .createQueryBuilder()
        .select('*')
        .from((qb) => {
          return qb
            .select([
              'ue.*',
              'el.stat_total AS stat_total',
              'el.equip_grade AS equip_grade',
              'el.equip_slot AS equip_slot',
              `ROW_NUMBER() OVER (
              PARTITION BY el.equip_slot
              ORDER BY 
                el.equip_grade DESC,
                ue.equip_level_id DESC,
                el.stat_total DESC,
                ue.equip_id DESC
            ) AS rankNumber`,
            ])
            .from('user_equip', 'ue')
            .innerJoin(
              'equip_level',
              'el',
              'ue.equip_level_id = el.equip_level_id',
            )
            .where('ue.user_id = :user_id', { user_id });
        }, 'ranked')
        .where('ranked.rankNumber = 1')
        .getRawMany();

      console.log(`장비 조회 완료. 장비 수: ${bestEquipList.length}`);

      // 장비 장착 처리
      await Promise.all(
        bestEquipList.map((equip) =>
          this.userEquipSlotService.equipSlotMount(
            user_id,
            equip.id,
            equip.equip_id,
            queryRunner,
          ),
        ),
      );

      const userEquipSlot = await this.userEquipSlotService.getEquipSlot(
        user_id,
        queryRunner,
      );

      // 내부적으로 시작한 트랜잭션인 경우 커밋
      if (shouldRelease) {
        await queryRunner.commitTransaction();
      }

      return userEquipSlot;
    } catch (error) {
      // 내부적으로 시작한 트랜잭션인 경우 롤백
      if (shouldRelease) {
        await queryRunner.rollbackTransaction();
      }
      throw error;
    } finally {
      // 내부적으로 생성한 QueryRunner만 릴리스
      if (shouldRelease) {
        await queryRunner.release();
      }
    }
  }

  async getEquipMaxLevelBuilder(
    user_id: string,
    start_id: number,
    end_id: number,
  ): Promise<EquipMaxLevelData | undefined> {
    const result = await this.dataSource
      .createQueryBuilder()
      .addSelect('lc.equip_slot', 'equip_slot')
      .addSelect('lc.equip_grade', 'equip_grade')
      //.addSelect('lr.user_id', 'user_id')
      .addSelect(
        'MAX(CASE WHEN lr.user_gold >= lc.total_gold ' +
          'AND (lc.require_item_id = 0 OR lr.user_items >= lc.total_items) ' +
          'THEN lc.equip_level_id ELSE 0 END)',
        'max_level',
      )
      .from((qb) => {
        // LevelUpCost CTE
        return (
          qb
            .select('e.equip_level_id', 'equip_level_id')
            .addSelect('e.equip_slot', 'equip_slot')
            .addSelect('e.equip_grade', 'equip_grade')
            .addSelect('e.level', 'level')
            .addSelect('e.level_max', 'level_max')
            .addSelect('e.require_gold', 'require_gold')
            .addSelect('e.require_item_id', 'require_item_id')
            .addSelect('e.require_item_count', 'require_item_count')
            .addSelect('e.used_gold_total', 'total_gold')
            .addSelect('e.used_item_total_count', 'total_items')
            // .addSelect(
            //   'SUM(e.require_gold) OVER (PARTITION BY e.equip_slot, e.equip_grade ORDER BY e.level)',
            //   'total_gold',
            // )
            // .addSelect(
            //   'SUM(e.require_item_count) OVER (PARTITION BY e.equip_slot, e.equip_grade, e.require_item_id ORDER BY e.level)',
            //   'total_items',
            // )
            .from('equip_level', 'e')
            .where('e.equip_level_id BETWEEN :start_id AND :end_id', {
              start_id,
              end_id,
            })
        );
      }, 'lc')
      .leftJoin(
        (qb) => {
          // UserResources CTE
          return qb
            .select('u.id', 'user_id')
            .addSelect('u.gord', 'user_gold')
            .addSelect('ui.item_id', 'item_id')
            .addSelect('ui.item_count', 'user_items')
            .from('users', 'u')
            .leftJoin('user_item', 'ui', 'ui.user_id = u.user_id')
            .where('u.user_id = :user_id', { user_id });
        },
        'lr',
        '(lc.require_item_id = 0 OR lc.require_item_id = lr.item_id)',
      )
      .setParameter('user_id', user_id) // 파라미터 설정
      .groupBy('lr.user_id')
      .addGroupBy('lc.equip_slot')
      .addGroupBy('lc.equip_grade');
    //.getRawOne();

    return (await result.getRawOne()) as EquipMaxLevelData;
  }

  async equipMaxLevel(
    user_id: string,
    equip_level_id: number,
    qr?: QueryRunner,
  ) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        equip_level_id,
      },
    });

    const equipLevel = this.equipLevelService.getEquipLevel(equip_level_id);

    const equip_level_id_max = this.getEquipMaxLevelId(
      equip_level_id,
      (await equipLevel).level_max,
    );

    const equipMaxLevelData = this.getEquipMaxLevelBuilder(
      user_id,
      equip_level_id,
      equip_level_id_max,
    );

    const result = await userEquipRepository.save({
      ...userEquip,
      equip_level_id: (await equipMaxLevelData).max_level,
    });

    const baseEquipId = await this.getBaseEquipId(userEquip.equip_level_id);
    console.log('baseEquipId', baseEquipId);

    const equip = await this.equipService.getEquip(baseEquipId, qr);

    await this.userEquipOptionService.equipOptionAdd(
      user_id,
      equip.origin_equip_id,
      equip.equip_grade + 1,
      qr,
    );

    return result;
  }
  async equipFusion(
    user_id: string,
    user_equip_id_01: number,
    user_equip_id_02: number,
    user_equip_id_03: number,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new Error('Invalid user_id: Must be a non-empty string.');
    }

    console.log('user_equip_id_01', typeof user_equip_id_01, user_equip_id_01);
    console.log('user_equip_id_02', typeof user_equip_id_02, user_equip_id_01);
    console.log('user_equip_id_03', typeof user_equip_id_03, user_equip_id_03);

    if (
      ![user_equip_id_01, user_equip_id_02, user_equip_id_03].every(
        (id) => typeof id === 'number' && id > 0,
      )
    ) {
      throw new Error(
        'Invalid equipment IDs: All IDs must be positive numbers.',
      );
    }

    const queryRunner = qr || this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userEquipRepository = this.getUserEquipRepository(qr);

      const equipIdList = await userEquipRepository
        .createQueryBuilder('ue')
        .select('ue.equip_id', 'equip_id')
        .where('ue.id IN (:...ids)', {
          ids: [user_equip_id_01, user_equip_id_02, user_equip_id_03],
        })
        .orderBy(
          `FIELD(ue.id, ${user_equip_id_01}, ${user_equip_id_02}, ${user_equip_id_03})`,
        ) // 순서를 명시적으로 지정
        .getRawMany();

      const userEquipData = await userEquipRepository.findOne({
        where: {
          id: user_equip_id_01,
        },
      });
      const level = userEquipData.equip_level_id.toString().slice(-2);

      console.log('userEquipData', userEquipData);
      const equipIds = equipIdList.map((item) => item.equip_id);
      const deleteEquipIds = equipIdList.map((item) => item.id);

      // 배열 길이 검증
      if (equipIds.length < 3) {
        throw new Error('Not enough equipment IDs provided for fusion.');
      }

      // 각 값 명시적 할당
      const [equipId01, equipId02, equipId03] = equipIds;

      // 다음 강화 장비 ID 계산
      const nextEquipID = await this.equipFusionNextEquipID(
        equipId01,
        equipId02,
        equipId03,
        qr,
      );

      console.log('nextEquipID', nextEquipID);

      // 새로운 장비 생성 (equip_level_id 계산)
      //const equipLevelId = `${nextEquipID.next_grade_equip_id}01`;
      const equipLevelId = `${nextEquipID.next_grade_equip_id}${level}`;
      console.log('equipLevelId', equipLevelId);
      await userEquipRepository.insert({
        user_id,
        equip_id: +nextEquipID.next_grade_equip_id,
        equip_level_id: +equipLevelId,
      });

      // 기존 장비 삭제
      await userEquipRepository.delete({
        user_id,
        id: In(deleteEquipIds),
      });

      console.log('equipIds', equipIds);

      // 남은 장비 조회
      const userEquip = await userEquipRepository.find({
        where: {
          user_id,
        },
      });

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();

      return userEquip;
    } catch (error) {
      // 오류 발생 시 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      if (!qr) {
        await queryRunner.release();
      }
    }
  }

  async equipFusionNextEquipID(
    equip_id_01: number,
    equip_id_02: number,
    equip_id_03: number,
    qr?: QueryRunner,
  ) {
    const queryRunner = qr || this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Selected Weapons CTE
      const selectedWeapons = queryRunner.manager
        .createQueryBuilder()
        .select('ue.user_id', 'user_id')
        .addSelect('ue.equip_id', 'equip_id')
        .addSelect('e.equip_slot', 'equip_slot')
        .addSelect('e.equip_grade', 'equip_grade')
        .from('user_equip', 'ue')
        .innerJoin('equip', 'e', 'ue.equip_id = e.equip_id')
        .where('ue.equip_id IN (:...equipIds)', {
          equipIds: [equip_id_01, equip_id_02, equip_id_03],
        });

      // Type Determination CTE
      const equipGradeDetermination = queryRunner.manager
        .createQueryBuilder()
        .select('e.equip_slot', 'equip_slot')
        .addSelect('e.equip_grade', 'equip_grade')
        .addSelect('e.equip_id', 'equip_id')
        .from('equip', 'e')
        .where('e.equip_id = :equipId', { equipId: equip_id_01 });

      // Material Validation CTE
      const materialValidation = queryRunner.manager
        .createQueryBuilder()
        .select('sw.equip_grade', 'equip_grade')
        .from(`(${selectedWeapons.getQuery()})`, 'sw')
        .innerJoin(
          `(${equipGradeDetermination.getQuery()})`,
          'td',
          'sw.equip_slot = td.equip_slot',
        )
        .where('sw.equip_id BETWEEN td.equip_id AND td.equip_id + 4')
        .groupBy('sw.equip_grade');

      // Next Grade Equip CTE
      const nextGradeEquip = queryRunner.manager
        .createQueryBuilder()
        .select('mv.equip_grade', 'current_grade')
        .addSelect('e_next.equip_id', 'next_grade_equip_id')
        .addSelect(
          'ROW_NUMBER() OVER (PARTITION BY mv.equip_grade ORDER BY e_next.equip_id)',
          'row_num',
        )
        .from(`(${materialValidation.getQuery()})`, 'mv')
        .innerJoin(
          'equip',
          'e_next',
          `e_next.equip_slot = (SELECT equip_slot FROM (${equipGradeDetermination.getQuery()}) td LIMIT 1) AND e_next.equip_grade = mv.equip_grade + 1`,
        );

      // Final Query
      const result = await queryRunner.manager
        .createQueryBuilder()
        .select('current_grade')
        .addSelect('next_grade_equip_id')
        .from(`(${nextGradeEquip.getQuery()})`, 'nq')
        .where('nq.row_num = 1')
        .setParameters({
          equipIds: [equip_id_01, equip_id_02, equip_id_03],
          equipId: equip_id_01,
        })
        .getRawOne();

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      if (!qr) await queryRunner.release();
    }
  }
}

// async getMaxEquipLevel(
//   userId: string,
//   currentEquipLevelId: number,
// ): Promise<number | null> {
//   const query = `
//     WITH RECURSIVE EquipUpgrade AS (
//         -- 초기 장비 레벨 설정
//         SELECT
//             el.equip_level_id,
//             el.require_gold,
//             el.used_gold_total,
//             el.used_item_total_count,
//             el.require_item_id,
//             el.require_item_count,
//             u.gord AS current_gold,
//             COALESCE(ui.item_count, 0) AS current_item_count
//         FROM equip_level el
//         JOIN users u ON u.user_id = ?
//         LEFT JOIN user_item ui ON ui.user_id = u.user_id AND ui.item_id = el.require_item_id
//         WHERE el.equip_level_id = ?

//         UNION ALL

//         -- 업그레이드 가능할 경우 다음 레벨을 가져옴
//         SELECT
//             el.equip_level_id,
//             el.require_gold,
//             el.used_gold_total,
//             el.used_item_total_count,
//             el.require_item_id,
//             el.require_item_count,
//             eu.current_gold,
//             eu.current_item_count
//         FROM equip_level el
//         JOIN EquipUpgrade eu ON el.equip_level_id = eu.equip_level_id + 1
//         WHERE eu.current_gold >= el.used_gold_total  -- 누적 골드 비교
//           AND eu.current_item_count >= el.used_item_total_count  -- 누적 아이템 비교
//           AND LEFT(el.equip_level_id, 8) = LEFT(eu.equip_level_id, 8) -- 같은 계열 내에서만 업그레이드 가능
//     )

//     -- 최대 업그레이드 가능한 레벨 찾기
//     SELECT equip_level_id
//     FROM EquipUpgrade
//     ORDER BY equip_level_id DESC
//     LIMIT 1;
//   `;

//   const result = await this.dataSource.query(query, [
//     userId,
//     currentEquipLevelId,
//   ]);

//   return result.length > 0 ? result[0].equip_level_id : null;
// }
