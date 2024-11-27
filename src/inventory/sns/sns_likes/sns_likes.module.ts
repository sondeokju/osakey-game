import { Module } from '@nestjs/common';
import { SnsLikesService } from './sns_likes.service';
import { SnsLikesController } from './sns_likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnsLikes } from './entities/sns_likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SnsLikes])],
  exports: [SnsLikesService],
  controllers: [SnsLikesController],
  providers: [SnsLikesService],
})
export class SnsLikesModule {}
