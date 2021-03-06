import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PromoteCommandHandler } from './domain/promote/promote-command.handler';
import { PromotedEventHandler } from './event-handlers/promoted-event.handler';
import { SalaryStandardModule } from 'salary-standard/salary-standard.module';
import { SalaryStandard } from 'salary-standard/entities/salary-standard.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { PersonSnapshotModule } from 'person-snapshot/person-snapshot.module';
import { PersonInitializedEventHandler } from './event-handlers/initialized-event.handler';
import { Initialize } from './domain/initialize';
import { Promote } from './domain/promote';
import { AggregateRepository } from 'services/aggregate.repository';
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Person, SalaryStandard]),
    PersonSnapshotModule
  ],
  controllers: [PersonController],
  providers: [
    PersonService,
    ...Promote,
    PromotedEventHandler,
    ...Initialize,
    PersonInitializedEventHandler,
    AggregateRepository,
  ]
})
export class PersonModule { }
