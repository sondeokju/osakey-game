import { PartialType } from '@nestjs/mapped-types';
import { CreateGachaOutputDto } from './create-gacha_output.dto';

export class UpdateGachaOutputDto extends PartialType(CreateGachaOutputDto) {}
