import { PartialType } from '@nestjs/mapped-types';
import { CreateGachaSellDto } from './create-gacha_sell.dto';

export class UpdateGachaSellDto extends PartialType(CreateGachaSellDto) {}
