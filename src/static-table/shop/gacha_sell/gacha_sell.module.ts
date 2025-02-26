import { Module } from '@nestjs/common';
import { GachaSellService } from './gacha_sell.service';
import { GachaSellController } from './gacha_sell.controller';
import { GachaSell } from './entities/gacha_sell.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GachaSell])],
  exports: [GachaSellService],
  controllers: [GachaSellController],
  providers: [GachaSellService],
})
export class GachaSellModule {}
