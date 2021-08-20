import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonSnapshotService } from './person-snapshot.service';
import { CreatePersonSnapshotDto } from './dto/create-person-snapshot.dto';
import { UpdatePersonSnapshotDto } from './dto/update-person-snapshot.dto';

@Controller('person-snapshot')
export class PersonSnapshotController {
  constructor(private readonly personSnapshotService: PersonSnapshotService) {}

  @Post()
  create(@Body() createPersonSnapshotDto: CreatePersonSnapshotDto) {
    return this.personSnapshotService.create(createPersonSnapshotDto);
  }

  @Get()
  findAll() {
    return this.personSnapshotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personSnapshotService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonSnapshotDto: UpdatePersonSnapshotDto) {
    return this.personSnapshotService.update(id, updatePersonSnapshotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personSnapshotService.remove(id);
  }
}
