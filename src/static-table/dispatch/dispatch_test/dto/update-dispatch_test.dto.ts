import { PartialType } from '@nestjs/mapped-types';
import { CreateDispatchTestDto } from './create-dispatch_test.dto';

export class UpdateDispatchTestDto extends PartialType(CreateDispatchTestDto) {}
