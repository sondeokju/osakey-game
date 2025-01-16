import { PartialType } from '@nestjs/mapped-types';
import { CreateZLoginLogDto } from './create-z_login_log.dto';

export class UpdateZLoginLogDto extends PartialType(CreateZLoginLogDto) {}
