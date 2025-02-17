import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAchieveRankingDto } from './create-user_achieve_ranking.dto';

export class UpdateUserAchieveRankingDto extends PartialType(CreateUserAchieveRankingDto) {}
