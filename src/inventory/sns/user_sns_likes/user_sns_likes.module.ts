import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSnsLikes } from './entities/user_sns_likes.entity';
import { UserSnsLikesService } from './user_sns_likes.service';
import { UserSnsLikesController } from './user_sns_likes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSnsLikes])],
  exports: [UserSnsLikesService],
  controllers: [UserSnsLikesController],
  providers: [UserSnsLikesService],
})
export class UserSnsLikesModule {}
