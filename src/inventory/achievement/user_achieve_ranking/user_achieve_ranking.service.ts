import { Injectable } from '@nestjs/common';
import { CreateUserAchieveRankingDto } from './dto/create-user_achieve_ranking.dto';
import { UpdateUserAchieveRankingDto } from './dto/update-user_achieve_ranking.dto';

@Injectable()
export class UserAchieveRankingService {
  create(createUserAchieveRankingDto: CreateUserAchieveRankingDto) {
    return 'This action adds a new userAchieveRanking';
  }

  findAll() {
    return `This action returns all userAchieveRanking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAchieveRanking`;
  }

  update(id: number, updateUserAchieveRankingDto: UpdateUserAchieveRankingDto) {
    return `This action updates a #${id} userAchieveRanking`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAchieveRanking`;
  }
}
