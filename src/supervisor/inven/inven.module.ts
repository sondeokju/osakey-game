import { Module } from '@nestjs/common';
import { InvenService } from './inven.service';
import { InvenController } from './inven.controller';
import { UserSuitModule } from 'src/inventory/suit/user_suit/user_suit.module';

@Module({
  imports: [UserSuitModule],
  exports: [InvenService],
  controllers: [InvenController],
  providers: [InvenService],
})
export class InvenModule {}
