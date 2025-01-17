import { PartialType } from '@nestjs/mapped-types';
import { CreateSuitInfoDto } from './create-suit_info.dto';

export class UpdateSuitInfoDto extends PartialType(CreateSuitInfoDto) {}
