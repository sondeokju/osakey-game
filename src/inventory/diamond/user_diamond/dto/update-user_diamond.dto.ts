import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDiamondDto } from './create-user_diamond.dto';

export class UpdateUserDiamondDto extends PartialType(CreateUserDiamondDto) {}
