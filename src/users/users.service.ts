import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { DataSource, IsNull, QueryRunner, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis, RedisService } from '@liaoliaots/nestjs-redis';
import { HeroService } from 'src/static-table/hero/hero.service';
import { RewardService } from 'src/static-table/reward/reward.service';
import { ItemService } from 'src/static-table/item/item.service';

@Injectable()
export class UsersService {
  private readonly redisClient: Redis;

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly redisService: RedisService,
    private readonly heroService: HeroService,
    private readonly rewardService: RewardService,
    private readonly itemService: ItemService,
  ) {
    this.redisClient = redisService.getClient();
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
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUserBase(id: number, qr?: QueryRunner) {
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
        id,
      },
    });
    return result;
  }

  async getUserMoney(id: number, qr?: QueryRunner) {
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
        id,
      },
    });

    return result;
  }

  async getMe(id: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const result = await usersRepository.findOne({
      select: {
        id: true,
        nickname: true,
        email: true,
        gord: true,
        diamond_paid: true,
        diamond_free: true,
        exp: true,
        battery: true,
        revive_coin: true,
        update_at: true,
        created_at: true,
        level: true,
      },
      where: {
        id,
      },
    });

    return result;
  }

  async patchTakeGord(id: number, gord: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
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

  async userLevelUp(id: number, qr?: QueryRunner) {
    const usersRepository = this.getUsersRepository(qr);
    const userData = await usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!userData) return -1;

    const currentExp = userData.exp;
    const currentLevel = userData.level;
    const nextLevel = currentLevel + 1;
    let updateLevel = currentLevel;
    let obj = {};

    const heroLevelData = await this.heroService.getHeroLevel(+nextLevel);
    const rewardData = await this.rewardService.getReward(1001);

    console.log(rewardData);

    // if (!heroLevelData) return -1;

    // if (currentExp >= heroLevelData.total_exp) {
    //   updateLevel = currentLevel + 1;
    // }

    // await usersRepository.save({
    //   ...userData,
    //   level: updateLevel,
    //   diamond_free: userData.diamond_free + 0,
    //   gord: userData.gord + 0,
    //   battery: userData.battery + 0,
    // });

    const resultArr = [];

    rewardData.forEach(async (reward, index) => {
      const resultObj = {};
      Object.entries(reward).forEach(([key, value]) => {
        //console.log(`${key}: ${value}`);
        resultObj[`${key}`] = `${value}`;
      });
      const itemData = await this.itemService.getItem(+resultObj['item_id']);
      console.log(itemData);
      resultObj['item_type'] = itemData.item_type;
      console.log(resultObj);
      resultArr.push(resultObj);
    });
    console.log('resultArr:', resultArr);

    const result = Object.values(resultArr);
    return result;
  }

  // async updateGord(id: number, gord: number, qr?: QueryRunner) {
  //   const usersRepository = this.getUsersRepository(qr);
  //   const existing = await usersRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   await usersRepository.save({
  //     ...existing,
  //     gord: gord,
  //   });

  //   return true;
  // }
}
