import { PartialType } from '@nestjs/mapped-types';
import { CreateSnsConfigDto } from './create-sns_config.dto';

export class UpdateSnsConfigDto extends PartialType(CreateSnsConfigDto) {}
