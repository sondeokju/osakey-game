import { Injectable } from '@nestjs/common';
import { CreateUserChallengeDto } from './dto/create-user_challenge.dto';
import { UpdateUserChallengeDto } from './dto/update-user_challenge.dto';

@Injectable()
export class UserChallengeService {
  create(createUserChallengeDto: CreateUserChallengeDto) {
    return 'This action adds a new userChallenge';
  }

  findAll() {
    return `This action returns all userChallenge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userChallenge`;
  }

  update(id: number, updateUserChallengeDto: UpdateUserChallengeDto) {
    return `This action updates a #${id} userChallenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} userChallenge`;
  }
}
