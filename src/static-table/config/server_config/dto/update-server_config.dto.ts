import { PartialType } from '@nestjs/mapped-types';
import { CreateServerConfigDto } from './create-server_config.dto';

export class UpdateServerConfigDto extends PartialType(CreateServerConfigDto) {}
