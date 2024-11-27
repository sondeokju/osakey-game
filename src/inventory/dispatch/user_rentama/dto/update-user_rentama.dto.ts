import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRentamaDto } from './create-user_rentama.dto';

export class UpdateUserRentamaDto extends PartialType(CreateUserRentamaDto) {}
