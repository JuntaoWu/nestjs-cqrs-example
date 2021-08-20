import { PartialType } from '@nestjs/swagger';
import { CreateSalaryStandardDto } from './create-salary-standard.dto';

export class UpdateSalaryStandardDto extends PartialType(CreateSalaryStandardDto) {}
