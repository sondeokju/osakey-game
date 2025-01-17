import { Module } from '@nestjs/common';
import { PassBountyService } from './pass_bounty.service';
import { PassBountyController } from './pass_bounty.controller';

@Module({
  controllers: [PassBountyController],
  providers: [PassBountyService],
})
export class PassBountyModule {}
