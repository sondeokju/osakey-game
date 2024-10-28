import { PartialType } from '@nestjs/mapped-types';
import { CreateLogUrlDto } from './create-log_url.dto';

export class UpdateLogUrlDto extends PartialType(CreateLogUrlDto) {}
