import { Length } from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import Redis from 'ioredis';
import { HeroService } from 'src/static-table/hero/hero.service';
import { User } from './decorator/user.decorator';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  private readonly redisClient: Redis;

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    //private readonly redisService: RedisService,
    private readonly heroService: HeroService,
    private readonly dataSource: DataSource,
  ) {
    //this.redisClient = redisService.getClient();
  }

  getUsersRepository(qr?: QueryRunner) {
    return qr ? qr.manager.getRepository<Users>(Users) : this.usersRepository;
  }

  someFunctionThatMightThrow() {
    // 예외가 발생할 수 있는 함수
    throw new Error('예외 발생!');
  }

  async getUserKey() {
    const result = this.redisClient.smembers('myset');
    console.log('getUserKey:', result);

    return result;
  }
  async setUserKey() {
    const result = this.redisClient.sadd('myset', 1, 2, 3, 4, 5, 5);
    console.log('setUserKey:', result);
    return result;
  }

  async delUserKey() {
    const result = this.redisClient.srem('myset');
    console.log('delUserKey:', result);
    return result;
  }

  async findOrCreateUser(
    email: string,
    device_id: string,
    member_id: string,
    provider: string,
    qr?: QueryRunner,
  ): Promise<Users> {
    let user: Users | null;

    const usersRepository = this.getUsersRepository(qr);

    // ✅ 1️⃣ 이메일이 같은 유저 찾기 (우선순위 1)
    user = await usersRepository.findOne({ where: { email } });

    if (user) {
      console.log('✅ 기존 유저 발견 (이메일 기준)');
      return user;
    }

    // ✅ 2️⃣ 디바이스 ID가 같은 유저 찾기 (우선순위 2)
    user = await usersRepository.findOne({
      where: { device_id: device_id },
    });

    if (user) {
      console.log('✅ 기존 유저 발견 (디바이스 ID 기준)');
      return user;
    }

    // ✅ 3️⃣ OAuth `sub`이 같은 유저 찾기 (우선순위 3)
    // user = await usersRepository.findOne({
    //   where: { oauth_sub: oauthSub },
    // });

    // if (user) {
    //   console.log('✅ 기존 유저 발견 (OAuth sub 기준)');
    //   return user;
    // }

    // ✅ 4️⃣ 유저가 없으면 새로 생성
    console.log('🆕 새로운 유저 생성');
    user = usersRepository.create({
      email,
      device_id: device_id,
      member_id: member_id,
      linked_member_ids: JSON.stringify([{ provider, member_id: member_id }]),
    });

    const savedUser = await usersRepository.save(user);
    const result = this.createUserID(savedUser.id);
    return result;
  }

  async createUser(user: Pick<Users, 'email' | 'nickname' | 'password'>) {
    // 1) nickname 중복이 없는지 확인
    // exist() -> 만약에 조건에 해당되는 값이 있으면 true 반환
    const nicknameExists = await this.usersRepository.exist({
      where: {
        nickname: user.nickname,
      },
    });

    if (nicknameExists) {
      throw new BadRequestException('이미 존재하는 nickname 입니다.!');
    }

    const emailExists = await this.usersRepository.exist({
      where: {
        email: user.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('이미 가입한 이메일입니다.!');
    }
    const userObject = this.usersRepository.create({
      nickname: user.nickname,
      email: user.email,
      password: user.password,
    });

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }

  async firstUserSetting(user_id: string, qr?: QueryRunner) {
    if (!qr || !qr.isTransactionActive) {
      throw new Error(
        'QueryRunner is required and must have an active transaction.',
      );
    }

    // 미션 세팅
    const mission_id = 12200001;
    const mission_kind = 'MM';
    const mission_goal = 100;
    await this.dataSource.query(
      `INSERT INTO user_mission (user_id, mission_id, mission_kind, mission_goal) VALUES (?, ?, ?, ?)`,
      [user_id, mission_id, mission_kind, mission_goal],
    );

    //suit 세팅 11500000
    const suit_id = 11500000;
    await this.dataSource.query(
      `INSERT INTO user_suit (user_id, suit_id) VALUES (?, ?)`,
      [user_id, suit_id],
    );

    //세카메 다이어리 세팅 12600001
    const secame_diary_id = 12600001;
    await this.dataSource.query(
      `INSERT INTO user_secame_diary (user_id, mission_id) VALUES (?, ?)`,
      [user_id, secame_diary_id],
    );

    //오프라인 보상 세팅
    const last_reward_date = new Date();
    const last_ad_date = new Date();
    await this.dataSource.query(
      `INSERT INTO user_offline_reward (user_id, last_reward_date, last_ad_date) VALUES (?, ?, ?)`,
      [user_id, last_reward_date, last_ad_date],
    );

    //sns Level
    await this.dataSource.query(
      `INSERT INTO user_sns_level (user_id, sns_level, reward_yn) VALUES (?, ?, ?)`,
      [user_id, 1, 'N'],
    );

    //attendance
    await this.dataSource.query(
      `INSERT INTO user_attendance (user_id, board_num, day, reward_id, reward_yn) VALUES (?, ?, ?, ?, ?)`,
      [user_id, 1, 1, '11600001', 'N'],
    );

    //equip_slot
    await this.dataSource.query(
      `INSERT INTO user_equip_slot (user_id, acc, engine, armor, boost, shoes, weapon) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, 0, 0, 0, 0, 0, 0],
    );
  }

  async createUserID(id: number, qr?: QueryRunner) {
    if (!qr || !qr.isTransactionActive) {
      throw new Error(
        'QueryRunner is required and must have an active transaction.',
      );
    }
    console.log('createUserID id:', id);

    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: { id },
    });

    if (!userData) {
      throw new Error(`User with id ${id} not found.`);
    }

    const newUserId = userData.id.toString().padStart(10, '0');
    console.log('createUserID newUserId:', newUserId);

    // 기존 `user_id`가 존재하면 중복 업데이트 방지
    if (userData.user_id) {
      console.log(
        `User ${id} already has user_id: ${userData.user_id}, skipping update.`,
      );
      return userData;
    }

    const randomNickname = randomBytes(4).toString('hex').toUpperCase(); // 8자리 랜덤 문자열

    await usersRepository.update(
      { id },
      { user_id: newUserId, nickname: randomNickname },
      //{ user_id: newUserId, nickname: 'SY372F9' },
    );

    await this.firstUserSetting(newUserId, qr);

    return await usersRepository.findOne({
      where: { id },
    });
  }

  // async createUserID(id: number, qr?: QueryRunner) {
  //   if (!qr || !qr.isTransactionActive) {
  //     throw new Error(
  //       'QueryRunner is required and must have an active transaction.',
  //     );
  //   }
  //   console.log('createUserID id:', id);

  //   const usersRepository = this.getUsersRepository(qr);
  //   const userData = await usersRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!userData) {
  //     throw new Error(`User with id ${id} not found.`);
  //   }

  //   const newUserId = userData.id.toString().padStart(10, '0');
  //   console.log('createUserID newUserId:', newUserId);

  //   //await this.firstUserSetting(newUserId, qr);

  //   await usersRepository.update({ id }, { user_id: newUserId });
  //   const result = await usersRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   return result;
  // }

  async getUserBan(user_id: string, qr?: QueryRunner) {
    if (!qr || !qr.isTransactionActive) {
      throw new Error(
        'QueryRunner is required and must have an active transaction.',
      );
    }

    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    if (!userData) {
      throw new Error(`User with id ${user_id} not found.`);
    }

    return {
      banStatus: userData.ban,
    };
  }

  async createUserEmail(id: number, email: string, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    await usersRepository.save({
      ...userData,
      email: email,
    });

    return true;
  }

  async createUserOsakey(
    email: string,
    pgs_id: string,
    os_type: string,
    qr?: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(qr);
    const userObject = usersRepository.create({
      email,
      pgs_id,
      os_type,
    });

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }

  // async createUserIDList(qr?: QueryRunner) {
  //   const nickname = 'osakey';

  //   for (let i = 1; i <= 100; i++) {
  //     await this.createUserID(`${nickname}${i}`, qr);
  //     await this.createUserEmail(i, `${nickname}${i}@abc.com`, qr);
  //   }

  //   return true;
  // }

  // async getAllUsers() {
  //   return this.usersRepository.find({
  //     select: {
  //       id: true,
  //       nickname: true,
  //       email: true,
  //     },
  //   });
  // }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUserBase(user_id: string, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const result = await usersRepository.findOne({
      select: {
        id: true,
        nickname: true,
        email: true,
        update_at: true,
        created_at: true,
      },
      where: {
        user_id,
      },
    });
    return result;
  }

  async getUserMoney(user_id: string, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const result = await usersRepository.findOne({
      select: {
        id: true,
        gord: true,
        diamond_paid: true,
        diamond_free: true,
        exp: true,
        battery: true,
        revive_coin: true,
        level: true,
      },
      where: {
        user_id,
      },
    });

    return result;
  }

  async getUserData(user_id: string, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const user_data = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    return {
      user_data,
      suit: {
        suit_id: 11500000,
      },
    };
  }

  async getMe(user_id: string, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const result = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    return result;
    // return {
    //   result,
    //   suit: {
    //     suit_id: 11500000,
    //   },
    // };
  }

  async patchTakeGord(user_id: string, gord: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    if (gord < 0) return -1;

    await usersRepository.save({
      ...userData,
      gord: userData.gord + gord,
    });

    const obj = {
      gord: { gord: gord },
    };

    const result = Object.values(obj);

    return result;
  }

  async resetUser(id: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    await usersRepository.save({
      ...userData,
      seca_coin: 100,
      gord: 10000,
      diamond_paid: 2000,
      diamond_free: 1000,
      exp: 0,
      battery: 100,
      revive_coin: 10,
      level: 1,
    });

    return await usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async patchTakeExp(id: number, exp: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    if (exp < 0) return -1;

    await usersRepository.save({
      ...userData,
      exp: exp,
    });

    const obj = {
      exp: { exp: exp },
    };

    const result = Object.values(obj);

    return result;
  }

  async patchTakeDiamondPaid(
    id: number,
    diamond_paid: number,
    qr?: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    if (diamond_paid < 0) return -1;

    await usersRepository.save({
      ...userData,
      diamond_paid: userData.diamond_paid + diamond_paid,
    });

    const obj = {
      diamond_paid: { diamond_paid: diamond_paid },
    };

    const result = Object.values(obj);

    return result;
  }

  async patchTakeDiamondFree(
    id: number,
    diamond_free: number,
    qr?: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    if (diamond_free < 0) return -1;

    await usersRepository.save({
      ...userData,
      diamond_free: userData.diamond_free + diamond_free,
    });

    // const obj = {
    //   diamond_free: diamond_free,
    // };

    //const result = Object.entries(obj);

    const obj = {
      diamond_free: { diamond_free: diamond_free },
    };

    const result = Object.values(obj);

    return result;
  }

  async deductDiamonds(
    user_id: string,
    amount: number,
    mode: 'free' | 'paid' | 'mixed',
    qr: QueryRunner,
  ) {
    const user = await qr.manager.query(
      `SELECT * FROM users WHERE user_id = ? FOR UPDATE`,
      [user_id],
    );

    if (!user.length) {
      throw new Error('User not found');
    }

    let diamondFree = user[0].diamond_free;
    let diamondPaid = user[0].diamond_paid;

    if (mode === 'free') {
      if (amount > diamondFree) {
        throw new BadRequestException('Not enough free dia');
      }
      diamondFree -= amount;
    } else if (mode === 'paid') {
      if (amount > diamondPaid) {
        throw new BadRequestException('Not enough paid dia');
      }
      diamondPaid -= amount;
    } else if (mode === 'mixed') {
      const dia_sum = diamondFree + diamondPaid;
      if (amount > dia_sum) {
        throw new BadRequestException('Not enough dia');
      }
      if (diamondFree >= amount) {
        diamondFree -= amount;
      } else {
        const remaining = amount - diamondFree;
        diamondFree = 0;
        diamondPaid -= remaining;
      }
    } else {
      throw new Error('Invalid mode');
    }

    await qr.manager.query(
      `UPDATE users SET diamond_free = ?, diamond_paid = ?, update_at = CURRENT_TIMESTAMP
     WHERE user_id = ? AND diamond_free = ? AND diamond_paid = ?`,
      [
        diamondFree,
        diamondPaid,
        user_id,
        user[0].diamond_free,
        user[0].diamond_paid,
      ],
    );

    return { user_id, diamond_free: diamondFree, diamond_paid: diamondPaid };
  }

  async deductPaidDiamond(
    user_id: string,
    amount: number,
    mode: 'free' | 'paid' | 'mixed',
    qr: QueryRunner,
  ) {
    const user = await qr.manager.query(
      `SELECT * FROM users WHERE user_id = ? FOR UPDATE`,
      [user_id],
    );

    if (!user.length) {
      throw new Error('User not found');
    }

    let diamondFree = user[0].diamond_free;
    let diamondPaid = user[0].diamond_paid;

    if (mode === 'free') {
      if (amount > diamondFree) {
        throw new BadRequestException('Not enough free dia');
      }
      diamondFree -= amount;
    } else if (mode === 'paid') {
      if (amount > diamondPaid) {
        throw new BadRequestException('Not enough paid dia');
      }
      diamondPaid -= amount;
    } else if (mode === 'mixed') {
      const dia_sum = diamondFree + diamondPaid;
      if (amount > dia_sum) {
        throw new BadRequestException('Not enough dia');
      }
      if (diamondPaid >= amount) {
        diamondPaid -= amount;
      } else {
        const remaining = amount - diamondPaid;
        diamondPaid = 0;
        diamondFree -= remaining;
      }
    } else {
      throw new Error('Invalid mode');
    }

    await qr.manager.query(
      `UPDATE users SET diamond_free = ?, diamond_paid = ?, update_at = CURRENT_TIMESTAMP
   WHERE user_id = ? AND diamond_free = ? AND diamond_paid = ?`,
      [
        diamondFree,
        diamondPaid,
        user_id,
        user[0].diamond_free,
        user[0].diamond_paid,
      ],
    );

    return { user_id, diamond_free: diamondFree, diamond_paid: diamondPaid };
  }

  async deductDiamonds2(
    user_id: string,
    amount: number,
    mode: 'free' | 'paid' | 'mixed',
    qr?: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(qr);
    const user = await usersRepository.findOne({
      where: { user_id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let diamondFree = user.diamond_free;
    let diamondPaid = user.diamond_paid;

    if (mode === 'free') {
      if (amount > user.diamond_free) {
        throw new BadRequestException('Not enough free dia');
      }
      diamondFree = Math.max(0, diamondFree - amount);
    } else if (mode === 'paid') {
      if (amount > user.diamond_paid) {
        throw new BadRequestException('Not enough paid dia');
      }
      diamondPaid = Math.max(0, diamondPaid - amount);
    } else if (mode === 'mixed') {
      const dia_sum = user.diamond_free + user.diamond_paid;
      if (amount > dia_sum) {
        throw new BadRequestException('Not enough dia');
      }
      if (diamondFree >= amount) {
        diamondFree -= amount;
      } else {
        const remaining = amount - diamondFree;
        diamondFree = 0;
        diamondPaid = Math.max(0, diamondPaid - remaining);
      }
    } else {
      throw new Error('Invalid mode');
    }

    // DB 업데이트
    await this.usersRepository.update(user_id, {
      diamond_free: diamondFree,
      diamond_paid: diamondPaid,
    });

    const result = await usersRepository.findOne({
      where: { user_id },
    });

    return result;
  }

  async reduceDiamondFree(
    user_id: string,
    diamond_free: number,
    qr?: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    if (diamond_free < 0) return -1;

    await usersRepository.save({
      ...userData,
      diamond_free: userData.diamond_free - diamond_free,
    });

    const obj = {
      diamond_free: { diamond_free: diamond_free },
    };

    return obj;
  }

  async reduceGord(user_id: string, gord: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const user = await usersRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.gord < gord) {
      throw new BadRequestException('Not enough gord.');
    }

    // `gord` 차감 후 업데이트
    await usersRepository.update(user_id, { gord: user.gord - gord });

    return true;
  }

  async reduceExp(user_id: string, exp: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    await usersRepository.save({
      ...userData,
      gord: userData.exp - exp,
    });

    return true;
  }

  async addExp(user_id: string, exp: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    await usersRepository.save({
      ...userData,
      gord: userData.exp + exp,
    });

    return true;
  }

  async addBattery(user_id: string, battery: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    await usersRepository.save({
      ...userData,
      gord: userData.battery + battery,
    });

    return true;
  }

  async addSecaCoin(user_id: string, seca_coin: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    await usersRepository.save({
      ...userData,
      gord: userData.seca_coin + seca_coin,
    });

    return true;
  }

  async addDia(user_id: string, dia: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    await usersRepository.save({
      ...userData,
      gord: userData.diamond_free + dia,
    });

    return true;
  }

  async addGord(user_id: string, gord: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);

    try {
      if (qr) {
        await qr.startTransaction();
      }

      console.log('Adding gord:', gord);

      await usersRepository
        .createQueryBuilder()
        .update('users')
        .set({ gord: () => `COALESCE(gord, 0) + ${gord}` }) // NULL 방지
        .where('user_id = :user_id', { user_id })
        .execute();

      if (qr) {
        await qr.commitTransaction();
      }

      return true;
    } catch (error) {
      if (qr) {
        await qr.rollbackTransaction();
      }
      throw error;
    }
  }

  async reduceBattery(user_id: string, battery: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    if (userData.battery < battery) {
      return {
        message: 'The battery is low.',
      };
    }

    try {
      if (qr) {
        await qr.startTransaction();
      }

      await usersRepository
        .createQueryBuilder()
        .update('users')
        .set({ battery: () => `COALESCE(battery, 0) - ${battery}` }) // NULL 방지
        .where('user_id = :user_id', { user_id })
        .execute();

      if (qr) {
        await qr.commitTransaction();
      }

      const userData = await usersRepository.findOne({
        where: {
          user_id,
        },
      });

      return userData;
    } catch (error) {
      if (qr) {
        await qr.rollbackTransaction();
      }
      throw error;
    }
  }

  async patchTakeBattery(id: number, battery: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    if (battery < 0) return -1;

    await usersRepository.save({
      ...userData,
      battery: userData.battery + battery,
    });

    const obj = {
      battery: { battery: battery },
    };

    const result = Object.values(obj);

    return result;
  }

  async patchTakeReviveCoin(id: number, revive_coin: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    if (revive_coin < 0) return -1;

    await usersRepository.save({
      ...userData,
      revive_coin: userData.revive_coin + revive_coin,
    });

    const obj = {
      revive_coin: { revive_coin: revive_coin },
    };

    const result = Object.values(obj);

    return result;
  }

  async patchTakeGordExpBattery(
    id: number,
    gord,
    exp,
    battery,
    qr?: QueryRunner,
  ) {
    if (gord < 0) return -1;
    if (exp < 0) return -1;
    if (battery < 0) return -1;

    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    await usersRepository.save({
      ...userData,
      gord: userData.gord + gord,
      exp: userData.exp + exp,
      battery: userData.battery + battery,
    });

    const obj = {
      gord: { gord: gord },
      exp: { exp: exp },
      battery: { battery: battery },
    };

    const result = Object.values(obj);

    return result;
  }

  async patchPayGordExpBattery(
    id: number,
    gord,
    exp,
    battery,
    qr?: QueryRunner,
  ) {
    if (gord < 0) return -1;
    if (exp < 0) return -1;
    if (battery < 0) return -1;

    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    if (userData.gord <= 0 && userData.gord < gord) return -1;
    if (userData.exp <= 0 && userData.exp < exp) return -1;
    if (userData.battery <= 0 && userData.battery < battery) return -1;

    await usersRepository.save({
      ...userData,
      gord: userData.gord - gord,
      exp: userData.exp - exp,
      battery: userData.battery - battery,
    });

    const obj = {
      gord: { gord: gord },
      exp: { exp: exp },
      battery: { battery: battery },
    };

    const result = Object.values(obj);

    return result;
  }

  async patchTakeDiamondPaidFreeReviveCoin(
    id: number,
    diamond_paid,
    diamond_free,
    revive_coin,
    qr?: QueryRunner,
  ) {
    if (diamond_paid < 0) return -1;
    if (diamond_free < 0) return -1;
    if (revive_coin < 0) return -1;

    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    await usersRepository.save({
      ...userData,
      diamond_paid: userData.diamond_paid + diamond_paid,
      diamond_free: userData.diamond_free + diamond_free,
      revive_coin: userData.revive_coin + revive_coin,
    });

    const obj = {
      diamond_paid: { diamond_paid: diamond_paid },
      diamond_free: { diamond_free: diamond_free },
      revive_coin: { revive_coin: revive_coin },
    };

    const result = Object.values(obj);

    return result;
  }

  async patchPayDiamondReviveCoin(
    id: number,
    payDiamond,
    revive_coin,
    qr?: QueryRunner,
  ) {
    if (payDiamond < 0) return -1;
    if (revive_coin < 0) return -1;

    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });

    const diamond = userData.diamond_free + userData.diamond_paid;

    if (diamond <= 0 && diamond < payDiamond) return -1;
    if (userData.revive_coin <= 0 && userData.revive_coin < revive_coin)
      return -1;

    const rest_diamond = userData.diamond_free - payDiamond;

    let paidDiamond = 0;
    let freeDiamond = 0;
    if (rest_diamond >= 0) freeDiamond = rest_diamond;
    if (rest_diamond < 0) {
      paidDiamond = Math.abs(rest_diamond);
      freeDiamond = payDiamond;
    }

    await usersRepository.save({
      ...userData,
      diamond_paid: userData.diamond_paid - paidDiamond,
      diamond_free: userData.diamond_free - freeDiamond,
      revive_coin: userData.revive_coin - revive_coin,
    });

    const obj = {
      diamond_paid: { diamond_paid: paidDiamond },
      diamond_free: { diamond_free: freeDiamond },
      revive_coin: { revive_coin: revive_coin },
    };

    const result = Object.values(obj);

    return result;
  }

  async userLevelUp(user_id: string, updateLevel: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    userData.level = updateLevel;
    const updatedUserData = await usersRepository.save(userData);

    return updatedUserData;
  }

  async socialLoginSaveUser(
    device_id: string,
    email: string,
    os_type: string,
    pgs_id?: string,
    qr?: QueryRunner,
  ) {
    if (!device_id) {
      throw new Error('device_id is required');
    }
    const usersRepository = this.getUsersRepository(qr);

    let user: Users;

    if (pgs_id) {
      // device_id와 pgs_id(subId)가 모두 있을 경우
      user = await usersRepository.findOne({ where: { device_id, pgs_id } });

      if (!user) {
        user = usersRepository.create({ device_id, email, os_type, pgs_id });
      } else {
        // 기존 user를 업데이트 가능
        user.update_at = new Date();
      }
    } else {
      // device_id만 있을 경우
      user = await usersRepository.findOne({ where: { device_id } });

      if (!user) {
        user = usersRepository.create({ device_id, email, os_type });
      } else {
        // 기존 user를 업데이트 가능
        user.update_at = new Date();
      }
    }

    return usersRepository.save(user);
  }

  async lineSocialLogin(
    member_id: string,
    social_user_id: string,
    qr?: QueryRunner,
  ) {
    const queryRunner = qr ?? this.dataSource.createQueryRunner();
    let isNewQueryRunner = false;

    if (!qr) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      isNewQueryRunner = true;
    }

    try {
      let result = null;

      if (member_id === 'UnityEditor_Member' && social_user_id) {
        console.log('33333333333');
        result = await this.handleEditorLogic(
          social_user_id,
          member_id,
          queryRunner,
        );
      } else if (member_id && member_id !== 'UnityEditor_Member') {
        if (!social_user_id) {
          console.log('111111111111111');
          result = await this.handleMemberIdLogic(member_id, queryRunner);
        } else {
          console.log('222222222222222');
          result = await this.handleSocialUserIdLogic(
            social_user_id,
            member_id,
            queryRunner,
          );
        }
      }

      if (isNewQueryRunner) {
        await queryRunner.commitTransaction();
      }

      return result;
    } catch (error) {
      if (isNewQueryRunner) {
        await queryRunner.rollbackTransaction();
      }
      throw error;
    } finally {
      if (isNewQueryRunner) {
        await queryRunner.release();
      }
    }
  }

  async handleMemberIdLogic(member_id: string, queryRunner: QueryRunner) {
    const usersRepository = this.getUsersRepository(queryRunner);
    const userData = await usersRepository.findOne({ where: { member_id } });

    if (member_id !== 'UnityEditor_Member' || !userData) {
      const user = await usersRepository.findOne({
        where: { member_id },
      });

      if (!user) {
        const newUser = usersRepository.create({ member_id });
        const savedUser = await usersRepository.save(newUser);

        if (!savedUser.id) {
          throw new Error('Failed to create user: ID not generated.');
        }

        return this.createUserID(savedUser.id, queryRunner); // 생성된 ID를 사용
      } else {
        return await usersRepository.save({
          ...user,
          update_at: new Date(),
        });
      }
    }
    return null;
  }

  async handleSocialUserIdLogic(
    social_user_id: string,
    member_id: string,
    queryRunner: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(queryRunner);
    const userData = await usersRepository.findOne({
      where: { member_id: member_id },
    });

    if (member_id !== 'UnityEditor_Member' && !userData) {
      const newUser = usersRepository.create({ member_id: member_id });
      const savedUser = await usersRepository.save(newUser);

      if (!savedUser.id) {
        throw new Error('Failed to create social user: ID not generated.');
      }

      return this.createUserID(savedUser.id, queryRunner); // 생성된 ID를 사용
    } else {
      return await usersRepository.save({
        ...userData,
        update_at: new Date(),
      });
    }
  }
  async handleEditorLogic(
    social_user_id: string,
    member_id: string,
    qr?: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: { member_id: social_user_id },
    });

    if (!userData) {
      const insertResult = await usersRepository.insert({
        member_id: social_user_id,
      });

      if (!insertResult.identifiers.length) {
        throw new Error('User insertion failed.');
      }

      const u_id = insertResult.identifiers[0]['id'];

      const result = await this.createUserID(u_id, qr);

      return result;
    } else {
      userData.update_at = new Date();
      const result = await usersRepository.save(userData);
      return result;
    }
  }

  async updatePrologue(user_id: string, prologue_yn: string, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    const result = await usersRepository.save({
      ...userData,
      prologue_yn: prologue_yn,
    });

    return result;
  }

  async updateNickname(user_id: string, nickname: string, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        user_id,
      },
    });

    const result = await usersRepository.save({
      ...userData,
      nickname: nickname,
    });

    return result;
  }

  async secamCreditReset(user_id: string, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const user = await usersRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new Error('User not found');
    }

    await usersRepository.update(user_id, { secame_credit: 0 });

    return await usersRepository.findOne({ where: { user_id } });
  }

  async secamCreditReward(
    user_id: string,
    secame_credit: number,
    qr?: QueryRunner,
  ) {
    const usersRepository = this.getUsersRepository(qr);
    const user = await usersRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new Error('User not found');
    }

    console.log('user.secame_credit : ', user.secame_credit);
    console.log('secame_credit : ', secame_credit);

    const newCredit = user.secame_credit + +secame_credit;
    console.log('newCredit : ', newCredit);

    await usersRepository.update(user_id, { secame_credit: newCredit });

    return await usersRepository.findOne({ where: { user_id } });
  }

  async secameCreditDeduct(user_id: string, amount: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const user = await usersRepository.findOne({
      where: { user_id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.secame_credit < amount) {
      throw new BadRequestException('Not enough secame credit.');
    }

    await usersRepository.update(user_id, {
      secame_credit: user.secame_credit - amount,
    });

    return await usersRepository.findOne({
      where: { user_id },
    });
  }
}
