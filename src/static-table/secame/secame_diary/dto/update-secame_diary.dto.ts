import { PartialType } from '@nestjs/mapped-types';
import { CreateSecameDiaryDto } from './create-secame_diary.dto';

export class UpdateSecameDiaryDto extends PartialType(CreateSecameDiaryDto) {}
