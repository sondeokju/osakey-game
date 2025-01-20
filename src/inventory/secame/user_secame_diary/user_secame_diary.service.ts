import { Injectable } from '@nestjs/common';
import { CreateUserSecameDiaryDto } from './dto/create-user_secame_diary.dto';
import { UpdateUserSecameDiaryDto } from './dto/update-user_secame_diary.dto';

@Injectable()
export class UserSecameDiaryService {
  create(createUserSecameDiaryDto: CreateUserSecameDiaryDto) {
    return 'This action adds a new userSecameDiary';
  }

  findAll() {
    return `This action returns all userSecameDiary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSecameDiary`;
  }

  update(id: number, updateUserSecameDiaryDto: UpdateUserSecameDiaryDto) {
    return `This action updates a #${id} userSecameDiary`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSecameDiary`;
  }
}
