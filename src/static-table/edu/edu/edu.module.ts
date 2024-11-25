import { Module } from '@nestjs/common';
import { EduService } from './edu.service';
import { EduController } from './edu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edu } from './entities/edu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Edu])],
  exports: [EduService],
  controllers: [EduController],
  providers: [EduService],
})
export class EduModule {}
