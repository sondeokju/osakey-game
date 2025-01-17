import { Injectable } from '@nestjs/common';
import { CreateSecameDiaryDto } from './dto/create-secame_diary.dto';
import { UpdateSecameDiaryDto } from './dto/update-secame_diary.dto';

@Injectable()
export class SecameDiaryService {
  create(createSecameDiaryDto: CreateSecameDiaryDto) {
    return 'This action adds a new secameDiary';
  }

  findAll() {
    return `This action returns all secameDiary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secameDiary`;
  }

  update(id: number, updateSecameDiaryDto: UpdateSecameDiaryDto) {
    return `This action updates a #${id} secameDiary`;
  }

  remove(id: number) {
    return `This action removes a #${id} secameDiary`;
  }
}
