import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
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
  ) {}

  getUserEquipRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquip>(UserEquip)
      : this.userEquipRepository;
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

  async equipMount(user_id: string, equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        equip_id,
      },
    });

    // if (!userEquip) {
    //   throw new NotFoundException('equip_id not found');
    // }

    return await this.userEquipSlotService.equipSlotMount(
      user_id,
      equip_id,
      qr,
    );
  }

  async equipLevelUp(user_id: string, equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);
    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        equip_id,
      },
    });

    if (!userEquip) {
      throw new NotFoundException(`User equip with ID ${equip_id} not found.`);
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

    return updateUserEquip;
  }

  async equipMaxLevelUp(user_id: string, equip_id: number, qr?: QueryRunner) {
    const userEquipRepository = this.getUserEquipRepository(qr);

    const userEquip = await userEquipRepository.findOne({
      where: {
        user_id,
        equip_id,
      },
    });

    if (!userEquip) {
      throw new NotFoundException(`User equip with ID ${equip_id} not found.`);
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
    console.log('baseEquipId', baseEquipId);

    const equip = await this.equipService.getEquip(baseEquipId, qr);

    // const equip_grade = await this.equipGradeService.getEquipGrade('TRUE');
    // if (parseInt(equipLevel.equip_grade, 10) === equip_grade.id) {
    //   throw new BadRequestException(`It is already at the 5 maximum grade.`);
    // }

    const equipLevelMaxData = this.equipLevelService.getEquipLevel(
      userEquip.equip_level_id,
    );

    const equip_max_level_id = this.getEquipMaxLevelId(
      userEquip.equip_level_id,
      (await equipLevelMaxData).level_max,
    );

    const equipMaxLevelData = this.getEquipMaxLevelBuilder(
      user_id,
      userEquip.equip_level_id,
      equip_max_level_id,
    );

    const equipLevelMax = await this.equipLevelService.getEquipLevel(
      (await equipMaxLevelData).max_level,
      qr,
    );

    await this.resourceManagerService.validateAndDeductResources(
      user_id,
      {
        gord: equipLevelMax.require_gold,
        item: {
          item_id: equipLevelMax.require_item_id,
          count: equipLevelMax.require_item_count,
        },
      },
      qr,
    );

    const updatedUserEquip = await userEquipRepository.save({
      ...userEquip,
      equip_level_id: (await equipMaxLevelData).max_level,
    });

    await this.userEquipOptionService.equipOptionAdd(
      user_id,
      equip.origin_equip_id,
      equip.equip_grade + 1,
      qr,
    );

    return updatedUserEquip;
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
        return qb
          .select('e.equip_level_id', 'equip_level_id')
          .addSelect('e.equip_slot', 'equip_slot')
          .addSelect('e.equip_grade', 'equip_grade')
          .addSelect('e.level', 'level')
          .addSelect('e.level_max', 'level_max')
          .addSelect('e.require_gold', 'require_gold')
          .addSelect('e.require_item_id', 'require_item_id')
          .addSelect('e.require_item_count', 'require_item_count')
          .addSelect(
            'SUM(e.require_gold) OVER (PARTITION BY e.equip_slot, e.equip_grade ORDER BY e.level)',
            'total_gold',
          )
          .addSelect(
            'SUM(e.require_item_count) OVER (PARTITION BY e.equip_slot, e.equip_grade, e.require_item_id ORDER BY e.level)',
            'total_items',
          )
          .from('equip_level', 'e')
          .where('e.equip_level_id >= :start_id', { start_id })
          .andWhere('e.equip_level_id <= :end_id', { end_id });
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
            .where('u.user_id = :userId', { user_id });
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
}
