import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemNoticeDto } from './create-system_notice.dto';

export class UpdateSystemNoticeDto extends PartialType(CreateSystemNoticeDto) {}
