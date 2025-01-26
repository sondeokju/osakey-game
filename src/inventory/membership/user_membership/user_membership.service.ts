import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserMembership } from './entities/user_membership.entity';

@Injectable()
export class UserMembershipService {
  constructor(
    @InjectRepository(UserMembership)
    private readonly userMembershipRepository: Repository<UserMembership>,
  ) {}

  getUserMembershipRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserMembership>(UserMembership)
      : this.userMembershipRepository;
  }

  async getUserMembership(user_id: string, qr?: QueryRunner) {
    const userMembershipRepository = this.getUserMembershipRepository(qr);
    const result = await userMembershipRepository.find({
      where: {
        user_id,
      },
    });

    return result;
  }
}
