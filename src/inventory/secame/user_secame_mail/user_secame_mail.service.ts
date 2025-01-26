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

  // async getUserSecameMail(mail_id: number, qr?: QueryRunner) {
  //   const userSecameMailRepository = this.getUserSecameMailRepository(qr);
  //   const result = await userSecameMailRepository.find({
  //     where: {
  //       mail_id,
  //     },
  //   });

  //   return result;
  // }
}
