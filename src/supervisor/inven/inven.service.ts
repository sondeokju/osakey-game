import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSuitService } from 'src/inventory/suit/user_suit/user_suit.service';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class InvenService {
  constructor(private readonly userSuitService: UserSuitService) {}

  async getUserInventoryAll(user_id: string, qr?: QueryRunner) {
    const suit = await this.userSuitService.getUserSuit(user_id, qr);

    const inven = {
      suit,
    };

    return inven;
  }
}
