import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UserEquipmentSlotModule } from 'src/user-equipment-slot/user-equipment-slot.module';

@Module({
  imports: [JwtModule.register({}), UsersModule, UserEquipmentSlotModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
