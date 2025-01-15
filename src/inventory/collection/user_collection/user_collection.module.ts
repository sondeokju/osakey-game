import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCollection } from './entities/user_collection.entity';
import { UserCollectionController } from './user_collection.controller';
import { UserCollectionService } from './user_collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCollection])],
  exports: [UserCollectionService],
  controllers: [UserCollectionController],
  providers: [UserCollectionService],
})
export class UserCollectionModule {}
