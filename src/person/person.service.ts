import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    // private readonly commandBus: CommandBus,
  ) {

  }

  create(createPersonDto: CreatePersonDto) {
    const person = this.personRepository.create(createPersonDto);
    return this.personRepository.save(person);
  }

  findAll() {
    return this.personRepository.find();
  }

  findOne(id: string) {
    return this.personRepository.findOne(id);
  }

  update(id: string, updatePersonDto: UpdatePersonDto) {
    return this.personRepository.update({ id, deletedDate: null }, updatePersonDto);
  }

  remove(id: string) {
    return this.personRepository.softDelete(id);
  }

  // async promote(promoteCommand: PromoteCommand) {
  //   await this.commandBus.execute(promoteCommand);
  // }

}
