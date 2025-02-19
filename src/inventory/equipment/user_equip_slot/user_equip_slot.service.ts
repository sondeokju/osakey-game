import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEquipSlot } from './entities/user_equip_slot.entity';
import { QueryRunner, Repository } from 'typeorm';
import { EquipService } from 'src/static-table/equipment/equip/equip.service';
import { DataSource } from 'typeorm';

@Injectable()
export class UserEquipSlotService {
  constructor(
    @InjectRepository(UserEquipSlot)
    private readonly userEquipSlotRepository: Repository<UserEquipSlot>,
    private readonly equipService: EquipService,
    private readonly dataSource: DataSource,
  ) {}

  getUserEquipSlotRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquipSlot>(UserEquipSlot)
      : this.userEquipSlotRepository;
  }

  async equipMountYN(
    user_id: string,
    user_equip_id: number,
    mount_yn: string,
    qr?: QueryRunner,
  ) {
    const manager = qr ? qr.manager : this.dataSource.manager;

    // SQL 쿼리 실행: mount_yn을 'Y'로 업데이트
    const sql = `
    UPDATE user_equip
    SET mount_yn = ?
    WHERE user_id = ? AND id = ?
  `;
    const parameters = [mount_yn, user_id, user_equip_id];

    await manager.query(sql, parameters);
  }

  async resetUserEquipMount(
    user_id: string,
    equipIds: number[],
    qr?: QueryRunner,
  ) {
    // 1. equipIds 배열이 비어있는 경우 처리
    if (!equipIds || equipIds.length === 0) {
      throw new Error('equipIds array is empty. No IDs to update.');
    }

    console.log('equipIds', equipIds);
    // 2. SQL 쿼리 작성
    const sql = `
    UPDATE user_equip
    SET mount_yn = 'N'
    WHERE user_id = ?
      AND id IN (${equipIds.map(() => '?').join(', ')})
  `;

    // 3. 쿼리 실행
    const parameters = [user_id, ...equipIds];
    const result = await (qr ? qr.manager : this.dataSource.manager).query(
      sql,
      parameters,
    );

    // 4. 결과 반환
    return result;
  }

  async equipSlotMount(
    user_id: string,
    user_equip_id: number,
    equip_id: number,
    qr?: QueryRunner,
  ) {
    const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
    let userEquipSlot = await userEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userEquipSlot) {
      userEquipSlot = userEquipSlotRepository.create({
        user_id,
        acc: 0,
        engine: 0,
        armor: 0,
        boost: 0,
        shoes: 0,
        weapon: 0,
      });
    }

    if (equip_id > 0) {
      console.log('equip_id', equip_id);
      const equip = await this.equipService.getEquip(equip_id, qr);
      if (!equip) {
        throw new NotFoundException(`Equip with ID ${equip_id} not found.`);
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
      userEquipSlot[equipSlotMap[equipSlotKey]] = +user_equip_id;
    }

    await this.equipMountYN(user_id, +user_equip_id, 'Y', qr);
    const result = await userEquipSlotRepository.save({
      ...userEquipSlot,
    });

    return result;
  }

  async equipSlotRelease(
    user_id: string,
    acc: number,
    engine: number,
    armor: number,
    boost: number,
    shoes: number,
    weapon: number,
    qr?: QueryRunner,
  ) {
    const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
    let userEquipSlot = await userEquipSlotRepository.findOne({
      where: { user_id },
    });

    if (!userEquipSlot) {
      throw new Error(`EquipSlot not found for user_id: ${user_id}`);
    }

    // 0인 값에 대한 해당 장비 ID 목록 추출
    const equipIdsToRelease = [];
    if (acc === 0) equipIdsToRelease.push(userEquipSlot.acc);
    if (engine === 0) equipIdsToRelease.push(userEquipSlot.engine);
    if (armor === 0) equipIdsToRelease.push(userEquipSlot.armor);
    if (boost === 0) equipIdsToRelease.push(userEquipSlot.boost);
    if (shoes === 0) equipIdsToRelease.push(userEquipSlot.shoes);
    if (weapon === 0) equipIdsToRelease.push(userEquipSlot.weapon);

    if (equipIdsToRelease.length > 0) {
      // user_equip 테이블의 mount_yn 값을 'N'으로 변경
      const sql = `
        UPDATE user_equip
        SET mount_yn = 'N'
        WHERE user_id = ?
          AND id IN (${equipIdsToRelease.map(() => '?').join(', ')})
      `;
      const params = [user_id, ...equipIdsToRelease];
      await (qr ? qr.query(sql, params) : this.dataSource.query(sql, params));
    }

    // userEquipSlot 업데이트
    userEquipSlot.acc = acc === 0 ? 0 : acc;
    userEquipSlot.engine = engine === 0 ? 0 : engine;
    userEquipSlot.armor = armor === 0 ? 0 : armor;
    userEquipSlot.boost = boost === 0 ? 0 : boost;
    userEquipSlot.shoes = shoes === 0 ? 0 : shoes;
    userEquipSlot.weapon = weapon === 0 ? 0 : weapon;

    await this.resetUserEquipMount(user_id, equipIdsToRelease, qr);
    return await userEquipSlotRepository.save(userEquipSlot);
  }

  // async equipSlotRelease(
  //   user_id: string,
  //   acc: number,
  //   engine: number,
  //   armor: number,
  //   boost: number,
  //   shoes: number,
  //   weapon: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
  //   let userEquipSlot = await userEquipSlotRepository.findOne({
  //     where: {
  //       user_id,
  //     },
  //   });

  //   if (!userEquipSlot) {
  //     throw new Error(`EquipSlot not found for user_id: ${user_id}`);
  //   }

  //   const equipIds = [acc, engine, armor, boost, shoes, weapon];

  //   // UserEquipSlot에서 equipIds 생성
  //   const equipIds = [
  //     userEquipSlot.acc,
  //     userEquipSlot.engine,
  //     userEquipSlot.armor,
  //     userEquipSlot.boost,
  //     userEquipSlot.shoes,
  //     userEquipSlot.weapon,
  //   ];

  //   // userEquipSlot.acc = acc === 0 ? 0 : userEquipSlot.acc;
  //   // userEquipSlot.engine = engine === 0 ? 0 : userEquipSlot.engine;
  //   // userEquipSlot.armor = armor === 0 ? 0 : userEquipSlot.armor;
  //   // userEquipSlot.boost = boost === 0 ? 0 : userEquipSlot.boost;
  //   // userEquipSlot.shoes = shoes === 0 ? 0 : userEquipSlot.shoes;
  //   // userEquipSlot.weapon = weapon === 0 ? 0 : userEquipSlot.weapon;

  //   userEquipSlot.acc = acc === 0 ? 0 : acc;
  //   userEquipSlot.engine = engine === 0 ? 0 : engine;
  //   userEquipSlot.armor = armor === 0 ? 0 : armor;
  //   userEquipSlot.boost = boost === 0 ? 0 : boost;
  //   userEquipSlot.shoes = shoes === 0 ? 0 : shoes;
  //   userEquipSlot.weapon = weapon === 0 ? 0 : weapon;

  //   await this.resetUserEquipMount(user_id, equipIds, qr);

  //   const result = await userEquipSlotRepository.save(userEquipSlot);
  //   return result;
  // }

  async equipSlotReset(user_id: string, qr?: QueryRunner) {
    const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
    const userEquipSlot = await userEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    const result = await userEquipSlotRepository.save({
      ...userEquipSlot,
      acc: 0,
      engine: 0,
      armor: 0,
      boost: 0,
      shoes: 0,
      weapon: 0,
    });

    // UserEquipSlot에서 equipIds 생성
    const equipIds = [
      userEquipSlot.acc,
      userEquipSlot.engine,
      userEquipSlot.armor,
      userEquipSlot.boost,
      userEquipSlot.shoes,
      userEquipSlot.weapon,
    ];

    await this.resetUserEquipMount(user_id, equipIds, qr);
    return result;
  }

  async getEquipSlot(user_id: string, qr?: QueryRunner) {
    const userEquipSlotRepository = this.getUserEquipSlotRepository(qr);
    const userEquipSlot = await userEquipSlotRepository.findOne({
      where: {
        user_id,
      },
    });

    return userEquipSlot;
  }
}
