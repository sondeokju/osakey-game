import { PartialType } from '@nestjs/mapped-types';
import { CreateGachaDrawDto } from './create-gacha_draw.dto';

export class UpdateGachaDrawDto extends PartialType(CreateGachaDrawDto) {}
