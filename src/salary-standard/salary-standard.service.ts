import { Injectable } from '@nestjs/common';
import { CreateSalaryStandardDto } from './dto/create-salary-standard.dto';
import { UpdateSalaryStandardDto } from './dto/update-salary-standard.dto';

@Injectable()
export class SalaryStandardService {
  create(createSalaryStandardDto: CreateSalaryStandardDto) {
    return 'This action adds a new salaryStandard';
  }

  findAll() {
    return `This action returns all salaryStandard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salaryStandard`;
  }

  update(id: number, updateSalaryStandardDto: UpdateSalaryStandardDto) {
    return `This action updates a #${id} salaryStandard`;
  }

  remove(id: number) {
    return `This action removes a #${id} salaryStandard`;
  }
}
