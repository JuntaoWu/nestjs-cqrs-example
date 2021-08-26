import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PromoteCommand } from './domain/promote/promote.command';
import { CommandBus } from '@nestjs/cqrs';
import { InitializePersonCommand } from './domain/initialize/initialize-person.command';
import { randomUUID } from 'crypto';
import { RevertPersonCommand } from './domain/revertPerson/revert-person.command';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly commandBus: CommandBus,
  ) { }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    // return this.personService.create(createPersonDto);
    const personId = randomUUID();
    return this.commandBus.execute(new InitializePersonCommand(
      personId,
      createPersonDto.firstname,
      createPersonDto.lastname,
    ));
  }

  @Get()
  async findAll() {
    const personList = await this.personService.findAll();
    return personList;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }

  @Post(':id/promote')
  promote(@Param('id') id: string) {
    return this.commandBus.execute(new PromoteCommand(id));
    // return this.personService.promote(new PromoteCommand(+id));
  }

  @Post(':id/revert/:personSnapshotId')
  revert(@Param('id') id: string, @Param(':personSnapshotId') personSnapshotId: string) {
    return this.commandBus.execute(new RevertPersonCommand(id, personSnapshotId));
  }

}
