import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { Person } from './entities/person.entity';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

const person1 = new Person();
person1.id = 'id1';
const person2 = new Person();
person2.id = 'id2';

const persons = [
  person1, person2
];

describe('PersonController', () => {
  let controller: PersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(persons),
            findOne: jest.fn().mockResolvedValue(person1),
            create: jest.fn().mockReturnValue(person2),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            remove: jest.fn().mockResolvedValue(true),
          }
        },
        CommandBus,
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
