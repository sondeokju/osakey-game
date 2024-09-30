import { MissionRoutine } from './entities/mission_routine.entity';
import { Injectable } from '@nestjs/common';
import { CreateMissionRoutineDto } from './dto/create-mission_routine.dto';
import { UpdateMissionRoutineDto } from './dto/update-mission_routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MissionRoutineService {
  constructor(
    @InjectRepository(MissionRoutine)
    private readonly missionRoutineRepository: Repository<MissionRoutine>,
  ) {}

  async getMissionRoutine(mission_type: number) {
    const result = await this.missionRoutineRepository.findOne({
      where: {
        mission_type,
      },
    });

    return result;
  }
  create(createMissionRoutineDto: CreateMissionRoutineDto) {
    return 'This action adds a new missionRoutine';
  }

  findAll() {
    return `This action returns all missionRoutine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} missionRoutine`;
  }

  update(id: number, updateMissionRoutineDto: UpdateMissionRoutineDto) {
    return `This action updates a #${id} missionRoutine`;
  }

  remove(id: number) {
    return `This action removes a #${id} missionRoutine`;
  }
}
