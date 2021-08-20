import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaryStandardService } from './salary-standard.service';
import { CreateSalaryStandardDto } from './dto/create-salary-standard.dto';
import { UpdateSalaryStandardDto } from './dto/update-salary-standard.dto';

@Controller('salary-standard')
export class SalaryStandardController {
  constructor(private readonly salaryStandardService: SalaryStandardService) {}

  @Post()
  create(@Body() createSalaryStandardDto: CreateSalaryStandardDto) {
    return this.salaryStandardService.create(createSalaryStandardDto);
  }

  @Get()
  findAll() {
    return this.salaryStandardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaryStandardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaryStandardDto: UpdateSalaryStandardDto) {
    return this.salaryStandardService.update(+id, updateSalaryStandardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryStandardService.remove(+id);
  }
}
