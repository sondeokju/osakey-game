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

  async getUserSecameMail(user_id: string, qr?: QueryRunner) {
    const userSecameMailRepository = this.getUserSecameMailRepository(qr);
    const userSecameMail = await userSecameMailRepository.find({
      where: { user_id },
    });

    return userSecameMail;
  }

  async npcSendMailToPlayer(
    user_id: string,
    mail_id: number,
    qr?: QueryRunner,
  ) {
    const userSecameMailRepository = this.getUserSecameMailRepository(qr);
    // const userSecameMail = await userSecameMailRepository.findOne({
    //   where: { id: user_suit_id, user_id },
    // });

    const newMail = userSecameMailRepository.create({
      user_id,
      mail_id: +mail_id,
      read_yn: 'N',
      mail_accept_date: new Date(),
    });

    const result = await userSecameMailRepository.save(newMail);

    return result;
  }

  async readSecameMail(
    user_id: string,
    user_secame_mail_id: number,
    qr?: QueryRunner,
  ) {
    const userSecameMailRepository = this.getUserSecameMailRepository(qr);
    const userSecameMail = await userSecameMailRepository.findOne({
      where: { id: user_secame_mail_id, user_id },
    });

    if (!userSecameMail) {
      throw new NotFoundException('UserSecameMail not found');
    }

    userSecameMail.read_yn = 'Y';
    const result = await userSecameMailRepository.save(userSecameMail);

    return result;
  }
}
