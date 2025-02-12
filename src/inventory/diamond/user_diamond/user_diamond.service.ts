import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserDiamond } from './entities/user_diamond.entity';

@Injectable()
export class UserDiamondService {
  constructor(
    @InjectRepository(UserDiamond)
    private readonly userDiamondRepository: Repository<UserDiamond>,
    private readonly dataSource: DataSource,
  ) {}

  getUserDiamondRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserDiamond>(UserDiamond)
      : this.userDiamondRepository;
  }

  async deductDiamonds(
    user_id: string,
    google_member_id: string,
    apple_member_id: string,
    amount: number,
  ) {
    const userDiamondRepository = this.getUserDiamondRepository(qr);
    // 1️⃣ Google & Apple 계정 다이아몬드 가져오기 (단일 쿼리)
    const diamonds = await userDiamondRepository.find({
      where: [
        { user_id, member_id: google_member_id },
        { user_id, member_id: apple_member_id },
      ],
    });

    if (diamonds.length < 2) {
      throw new NotFoundException('유저 다이아몬드 정보 없음');
    }

    // Google과 Apple 다이아 정보를 분리
    const googleDiamonds = diamonds.find(
      (d) => d.member_id === google_member_id,
    );
    const appleDiamonds = diamonds.find((d) => d.member_id === apple_member_id);

    if (!googleDiamonds || !appleDiamonds) {
      throw new NotFoundException('유저 다이아몬드 정보 없음');
    }

    let remainingAmount = amount;

    // 2️⃣ 다이아몬드 차감 우선순위 리스트
    const deductionOrder = [
      { source: googleDiamonds, type: 'diamond_paid' }, // Google 유료 다이아
      { source: appleDiamonds, type: 'diamond_paid' }, // Apple 유료 다이아
      { source: googleDiamonds, type: 'diamond_bonus' }, // Google 유료 보너스 다이아
      { source: appleDiamonds, type: 'diamond_bonus' }, // Apple 유료 보너스 다이아
      { source: googleDiamonds, type: 'diamond_free' }, // Google 무료 다이아
      { source: appleDiamonds, type: 'diamond_free' }, // Apple 무료 다이아
    ];

    // 3️⃣ 남은 금액을 차감
    for (const { source, type } of deductionOrder) {
      if (remainingAmount <= 0) break;

      const availableAmount = source[type];

      if (availableAmount >= remainingAmount) {
        source[type] -= remainingAmount;
        remainingAmount = 0;
      } else {
        remainingAmount -= availableAmount;
        source[type] = 0;
      }
    }

    // 4️⃣ 최종 차감 결과 저장
    const result = await this.userDiamondRepository.save([
      googleDiamonds,
      appleDiamonds,
    ]);
    return result;
  }

  async addDiamonds(
    user_id: string,
    member_id: string,
    type: 'diamond_paid' | 'diamond_bonus' | 'diamond_free',
    amount: number,
  ) {
    // 1️⃣ 해당 유저의 특정 계정(Google/Apple)의 다이아몬드 정보 가져오기
    const diamondRecord = await this.userDiamondRepository.findOne({
      where: { user_id, member_id },
    });

    if (!diamondRecord) {
      throw new NotFoundException('해당 유저 다이아몬드 정보 없음');
    }

    // 2️⃣ 다이아몬드 추가
    diamondRecord[type] += amount;

    // 3️⃣ 변경된 데이터 저장
    const result = await this.userDiamondRepository.save(diamondRecord);

    return result;
  }
}
