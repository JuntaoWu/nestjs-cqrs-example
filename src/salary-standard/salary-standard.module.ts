import { Module } from '@nestjs/common';
import { SalaryStandardService } from './salary-standard.service';
import { SalaryStandardController } from './salary-standard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryStandard } from './entities/salary-standard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalaryStandard])],
  controllers: [SalaryStandardController],
  providers: [SalaryStandardService]
})
export class SalaryStandardModule { }
