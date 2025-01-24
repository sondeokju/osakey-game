import { Injectable } from '@nestjs/common';
import { CreateRunStageDto } from './dto/create-run_stage.dto';
import { UpdateRunStageDto } from './dto/update-run_stage.dto';

@Injectable()
export class RunStageService {
  create(createRunStageDto: CreateRunStageDto) {
    return 'This action adds a new runStage';
  }

  findAll() {
    return `This action returns all runStage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} runStage`;
  }

  update(id: number, updateRunStageDto: UpdateRunStageDto) {
    return `This action updates a #${id} runStage`;
  }

  remove(id: number) {
    return `This action removes a #${id} runStage`;
  }
}
