import { Module } from '@nestjs/common';
import { PassService } from './pass.service';
import { PassController } from './pass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pass } from './entities/pass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pass])],
  exports: [PassService],
  controllers: [PassController],
  providers: [PassService],
})
export class PassModule {}
