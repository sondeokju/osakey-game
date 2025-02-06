import { Injectable } from '@nestjs/common';
import { CreateBountyStageDto } from './dto/create-bounty_stage.dto';
import { UpdateBountyStageDto } from './dto/update-bounty_stage.dto';

@Injectable()
export class BountyStageService {
  create(createBountyStageDto: CreateBountyStageDto) {
    return 'This action adds a new bountyStage';
  }

  findAll() {
    return `This action returns all bountyStage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bountyStage`;
  }

  update(id: number, updateBountyStageDto: UpdateBountyStageDto) {
    return `This action updates a #${id} bountyStage`;
  }

  remove(id: number) {
    return `This action removes a #${id} bountyStage`;
  }
}
