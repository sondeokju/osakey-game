import { PartialType } from '@nestjs/mapped-types';
import { CreateAchieveListDto } from './create-achieve_list.dto';

export class UpdateAchieveListDto extends PartialType(CreateAchieveListDto) {}
