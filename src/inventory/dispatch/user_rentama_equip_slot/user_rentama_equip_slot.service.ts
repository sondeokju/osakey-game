import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserRentamaEquipSlot } from './entities/user_rentama_equip_slot.entity';
import { UserEquipService } from 'src/inventory/equipment/user_equip/user_equip.service';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { EquipLevelService } from 'src/static-table/equipment/equip_level/equip_level.service';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRentamaEquipSlotService {
  constructor(
    @InjectRepository(UserRentamaEquipSlot)
    private readonly userRentamaEquipSlotRepository: Repository<UserRentamaEquipSlot>,
    private readonly userEquipService: UserEquipService,
    private readonly equipService: EquipService,
    private readonly equipLevelService: EquipLevelService,
    private readonly dataSource: DataSource,
  ) {}

  getUserRentamaEquipSlotRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserRentamaEquipSlot>(UserRentamaEquipSlot)
      : this.userRentamaEquipSlotRepository;
  }

  async autoEquipGear(user_id: string, qr?: QueryRunner) {
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
            .where('ue.user_id = :user_id', { user_id })
            .andWhere('ue.mount_yn = :mount_yn', { mount_yn: 'N' });
        }, 'ranked')
        .where('ranked.rankNumber = 1')
        .getRawMany();

      console.log(`장비 조회 완료. 장비 수: ${bestEquipList.length}`);

      // 장비 장착 처리
      await Promise.all(
        bestEquipList.map((equip) =>
          this.rentamaEquipSlotChange(user_id, equip.id, queryRunner),
        ),
      );

      const userEquipSlot = await this.getRentamaEquipSlot(
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

  async getRentamaEquipSlot(user_id: string, qr?: QueryRunner) {
    const userRentamaEquipSlotRepository =
      this.getUserRentamaEquipSlotRepository(qr);
    const userRentamaEquipSlot = await userRentamaEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    return userRentamaEquipSlot;
  }

  async rentamaEquipSlotChange(
    user_id: string,
    user_equip_id: number,
    qr?: QueryRunner,
  ) {
    const userRentamaEquipSlotRepository =
      this.getUserRentamaEquipSlotRepository(qr);
    let userRentamaEquipSlot = await userRentamaEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    const userEquip = await this.userEquipService.getUserEquip(
      user_equip_id,
      user_id,
      qr,
    );

    const equip_id = userEquip?.equip_id ?? 0;

    if (userEquip.mount_yn === 'Y') {
      //return
    }

    if (!userRentamaEquipSlot) {
      userRentamaEquipSlot = userRentamaEquipSlotRepository.create({
        user_id,
        acc: 0,
        engine: 0,
        armor: 0,
        boost: 0,
        shoes: 0,
        weapon: 0,
      });
    }

    let existingEquip;

    if (equip_id > 0) {
      const equip = await this.equipService.getEquip(equip_id, qr);
      if (!equip) {
        //throw new NotFoundException(`Equip with ID ${equip_id} not found.`);
      }

      const equipSlotMap = {
        acc: 'acc',
        engine: 'engine',
        armor: 'armor',
        boost: 'boost',
        shoes: 'shoes',
        weapon: 'weapon',
      };

      const equipSlotKey = equip.equip_slot.toLowerCase();
      existingEquip = userRentamaEquipSlot[equipSlotMap[equipSlotKey]];
      userRentamaEquipSlot[equipSlotMap[equipSlotKey]] = +user_equip_id;
    }

    await this.userEquipService.equipMountYN(user_id, +user_equip_id, qr);
    await this.userEquipService.unEquipYN(user_id, +existingEquip, qr);

    const result = await userRentamaEquipSlotRepository.save({
      ...userRentamaEquipSlot,
    });

    return {
      userRentamaEquipSlot: result,
    };
  }

  async rentamaEquipGrade(user_id: string, qr?: QueryRunner) {
    const userRentamaEquipSlotRepository =
      this.getUserRentamaEquipSlotRepository(qr);
    const slot = await userRentamaEquipSlotRepository.findOne({
      where: { user_id },
    });

    // 각 슬롯에 해당하는 필드명을 배열로 정의
    const equipTypes = ['acc', 'engine', 'armor', 'boost', 'shoes', 'weapon'];
    const equipGrades: number[] = [];

    // 각 슬롯 id에 대해 userEquip과 equip을 조회하여 equip_grade 값을 추출
    for (const equipType of equipTypes) {
      const equipSlotId = slot[equipType];
      const userEquip = await this.userEquipService.getUserEquip(
        equipSlotId,
        user_id,
        qr,
      );
      const equip = await this.equipService.getEquip(userEquip.equip_id);
      equipGrades.push(equip.equip_grade);
    }

    return equipGrades;
  }

  async rentamaEquipLevel(user_id: string, qr?: QueryRunner) {
    const userRentamaEquipSlotRepository =
      this.getUserRentamaEquipSlotRepository(qr);
    const slot = await userRentamaEquipSlotRepository.findOne({
      where: { user_id },
    });

    // 각 슬롯에 해당하는 필드명을 배열로 정의
    const equipTypes = ['acc', 'engine', 'armor', 'boost', 'shoes', 'weapon'];
    const equipLevels: number[] = [];

    // 각 슬롯 id에 대해 userEquip과 equip을 조회하여 equip_grade 값을 추출
    for (const equipType of equipTypes) {
      const equipSlotId = slot[equipType];
      const userEquip = await this.userEquipService.getUserEquip(
        equipSlotId,
        user_id,
        qr,
      );
      const equipLevel = await this.equipLevelService.getEquipLevel(
        userEquip.equip_level_id,
      );
      equipLevels.push(equipLevel.level);
    }

    return equipLevels;
  }
}
