import { Module } from '@nestjs/common';
import { PassBountyService } from './pass_bounty.service';
import { PassBountyController } from './pass_bounty.controller';
import { PassBounty } from './entities/pass_bounty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PassBounty])],
  exports: [PassBountyService],
  controllers: [PassBountyController],
  providers: [PassBountyService],
})
export class PassBountyModule {}
