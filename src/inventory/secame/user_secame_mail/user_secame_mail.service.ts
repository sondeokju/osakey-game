import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSecameMail } from './entities/user_secame_mail.entity';

@Injectable()
export class UserSecameMailService {
  constructor(
    @InjectRepository(UserSecameMail)
    private readonly userSecameMailRepository: Repository<UserSecameMail>,
  ) {}

  getUserSecameMailRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSecameMail>(UserSecameMail)
      : this.userSecameMailRepository;
  }


  async unlockSuitWithSuitPieces(
    user_id: string,
    user_suit_id: number,
    qr?: QueryRunner,
  ) {
    const userSecameMailRepository = this.getUserSecameMailRepository(qr);
    const userSuit = await userSecameMailRepository.findOne({
      where: { id: user_suit_id, user_id },
    });

    if (!userSuit) {
      throw new NotFoundException('User suit not found');
    }

    userSuit.unlock_yn = 'Y';
    const result = await userSuitRepository.save(userSuit);

    return result;
  }
}
