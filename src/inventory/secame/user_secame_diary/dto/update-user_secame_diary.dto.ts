import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSecameDiaryDto } from './create-user_secame_diary.dto';

export class UpdateUserSecameDiaryDto extends PartialType(CreateUserSecameDiaryDto) {}
