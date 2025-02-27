import { Injectable } from '@nestjs/common';
import { CreateUserChallengeExtraDto } from './dto/create-user_challenge_extra.dto';
import { UpdateUserChallengeExtraDto } from './dto/update-user_challenge_extra.dto';

@Injectable()
export class UserChallengeExtraService {
  create(createUserChallengeExtraDto: CreateUserChallengeExtraDto) {
    return 'This action adds a new userChallengeExtra';
  }

  findAll() {
    return `This action returns all userChallengeExtra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userChallengeExtra`;
  }

  update(id: number, updateUserChallengeExtraDto: UpdateUserChallengeExtraDto) {
    return `This action updates a #${id} userChallengeExtra`;
  }

  remove(id: number) {
    return `This action removes a #${id} userChallengeExtra`;
  }
}
