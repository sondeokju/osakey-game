import { Module } from '@nestjs/common';
import { GachaDrawService } from './gacha_draw.service';
import { GachaDrawController } from './gacha_draw.controller';

@Module({
  imports: [],
  exports: [GachaDrawService],
  controllers: [GachaDrawController],
  providers: [GachaDrawService],
})
export class GachaDrawModule {}
