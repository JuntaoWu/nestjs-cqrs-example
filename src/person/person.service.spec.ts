import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { SalaryStandard } from 'salary-standard/entities/salary-standard.entity';
import { Person } from './entities/person.entity';
import { PersonService } from './person.service';

const person1 = new Person();
person1.id = 'id1';
const person2 = new Person();
person2.id = 'id2';

const persons = [
  person1, person2
];

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(Person),
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            findAll: jest.fn().mockResolvedValue(persons),
            findOne: jest.fn().mockResolvedValue(person1),
            create: jest.fn().mockReturnValue(person2),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
            softRemove: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
