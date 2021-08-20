import { Injectable } from '@nestjs/common';
import { CreatePersonSnapshotDto } from './dto/create-person-snapshot.dto';
import { UpdatePersonSnapshotDto } from './dto/update-person-snapshot.dto';

@Injectable()
export class PersonSnapshotService {
  create(createPersonSnapshotDto: CreatePersonSnapshotDto) {
    return 'This action adds a new personSnapshot';
  }

  findAll() {
    return `This action returns all personSnapshot`;
  }

  findOne(id: string) {
    return `This action returns a #${id} personSnapshot`;
  }

  update(id: string, updatePersonSnapshotDto: UpdatePersonSnapshotDto) {
    return `This action updates a #${id} personSnapshot`;
  }

  remove(id: string) {
    return `This action removes a #${id} personSnapshot`;
  }
}
