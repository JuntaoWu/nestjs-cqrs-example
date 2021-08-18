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
    private personRepository: Repository<Person>) {

  }

  create(createPersonDto: CreatePersonDto) {
    const person = this.personRepository.create(createPersonDto);
    return this.personRepository.save(person);
  }

  findAll() {
    return this.personRepository.find();
  }

  findOne(id: number) {
    return this.personRepository.findOne(id);
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return this.personRepository.update({id, deletedDate: null}, updatePersonDto);
  }

  remove(id: number) {
    return this.personRepository.softDelete(id);
  }
}
