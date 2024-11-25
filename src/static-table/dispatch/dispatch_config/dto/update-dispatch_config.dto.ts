import { PartialType } from '@nestjs/mapped-types';
import { CreateDispatchConfigDto } from './create-dispatch_config.dto';

export class UpdateDispatchConfigDto extends PartialType(CreateDispatchConfigDto) {}
