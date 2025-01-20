import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDispatchRentamaDto } from './create-user_dispatch_rentama.dto';

export class UpdateUserDispatchRentamaDto extends PartialType(CreateUserDispatchRentamaDto) {}
