import { Module } from '@nestjs/common';
import { PassEduService } from './pass_edu.service';
import { PassEduController } from './pass_edu.controller';
import { PassEdu } from './entities/pass_edu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PassEdu])],
  exports: [PassEduService],
  controllers: [PassEduController],
  providers: [PassEduService],
})
export class PassEduModule {}
