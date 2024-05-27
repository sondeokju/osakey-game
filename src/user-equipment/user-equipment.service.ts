import { Injectable } from '@nestjs/common';
import { UserEquipment } from './entities/user-equipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { GachaService } from 'src/static-table/gacha/gacha.service';

@Injectable()
export class UserEquipmentService {
  constructor(
    @InjectRepository(UserEquipment)
    private readonly userEquipmentRepository: Repository<UserEquipment>,
    private readonly gachaService: GachaService,
  ) {}

  getUserEquipmentRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEquipment>(UserEquipment)
      : this.userEquipmentRepository;
  }

  async createEquipment(
    user_id: number,
    equipment_id: number,
    qr?: QueryRunner,
  ) {
    const userEquipmentRepository = this.getUserEquipmentRepository(qr);

    const userObject = userEquipmentRepository.create({
      // updateAt: Date(),
      // createdAt: Date(),
      user_id: user_id,
      equipment_id: equipment_id,
    });

    const newEqipment = await userEquipmentRepository.save(userObject);

    return newEqipment;
  }

  async deleteEquipment(id: number, qr?: QueryRunner) {
    const userEquipmentRepository = this.getUserEquipmentRepository(qr);

    await userEquipmentRepository.delete({
      id: id,
    });

    return true;
  }

  async getUserEquipmentAll(user_id: number) {
    const result = await this.userEquipmentRepository.find({
      select: {
        id: true,
        update_at: true,
        created_at: true,
        user_id: true,
        equipment_id: true,
      },
      where: {
        user_id: user_id,
      },
    });
    return result;
  }

  calculateProbabilities(weights: number[]): number[] {
    const totalWeight = weights.reduce((acc, val) => acc + val, 0);
    const probabilities = weights.map((weight) => weight / totalWeight);
    return probabilities;
  }

  equipmentByProbability(probabilities: number[]): number {
    const randomNumber = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i];
      if (randomNumber <= cumulativeProbability) {
        return i;
      }
    }

    // probabilities 배열이 올바르게 구성되었는지 확인하고 여기에 도달하면 디폴트로 첫 번째 값 반환
    console.error('Invalid probabilities array!');
    return 0;
  }

  async equipmentRandom(user_id, rand_cnt): Promise<number[]> {
    let weights = [];
    let equipResult = [];
    const gachaData = await this.gachaService.getGacha();

    for (const gacha of gachaData) {
      weights.push(gacha.rate);
    }
    const probabilities = this.calculateProbabilities(weights);
    for (let i = 0; i < +rand_cnt; i++) {
      const selectedIndex = this.equipmentByProbability(probabilities);
      const equipment_id = gachaData[selectedIndex].equipment_id;
      equipResult.push(equipment_id);
      await this.createEquipment(user_id, equipment_id);
    }

    return equipResult;
  }

  async equipmentRandom1000(user_id): Promise<number> {
    let weights = [];
    const gachaData = await this.gachaService.getGacha();

    for (const gacha of gachaData) {
      weights.push(gacha.rate);
    }
    const probabilities = this.calculateProbabilities(weights);
    for (let i = 0; i < 10; i++) {
      const selectedIndex = this.equipmentByProbability(probabilities);
      const equipment_id = gachaData[selectedIndex].equipment_id;
      await this.createEquipment(user_id, equipment_id);
    }

    return 0;
  }
}
