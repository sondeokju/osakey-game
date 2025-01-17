import { Injectable } from '@nestjs/common';
import { CreatePassBountyDto } from './dto/create-pass_bounty.dto';
import { UpdatePassBountyDto } from './dto/update-pass_bounty.dto';

@Injectable()
export class PassBountyService {
  create(createPassBountyDto: CreatePassBountyDto) {
    return 'This action adds a new passBounty';
  }

  findAll() {
    return `This action returns all passBounty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passBounty`;
  }

  update(id: number, updatePassBountyDto: UpdatePassBountyDto) {
    return `This action updates a #${id} passBounty`;
  }

  remove(id: number) {
    return `This action removes a #${id} passBounty`;
  }
}
