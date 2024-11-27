import { Controller, Get, Post } from '@nestjs/common';
import { UserRentamaService } from './user_rentama.service';

@Controller('user-rentama')
export class UserRentamaController {
  constructor(private readonly userRentamaService: UserRentamaService) {}
}
