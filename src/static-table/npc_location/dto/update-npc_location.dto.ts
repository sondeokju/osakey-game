import { PartialType } from '@nestjs/mapped-types';
import { CreateNpcLocationDto } from './create-npc_location.dto';

export class UpdateNpcLocationDto extends PartialType(CreateNpcLocationDto) {}
