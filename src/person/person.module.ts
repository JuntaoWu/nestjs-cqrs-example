import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PromoteCommandHandler } from './domain/promote/promote-command.handler';
import { PromotedEventHandler } from './event-handlers/promoted-event.handler';
import { SalaryStandardModule } from 'src/salary-standard/salary-standard.module';
import { SalaryStandard } from 'src/salary-standard/entities/salary-standard.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { PersonSnapshotModule } from 'src/person-snapshot/person-snapshot.module';
import { PersonInitializedEventHandler } from './event-handlers/initialized-event.handler';
import { InitializePersonCommandHandler } from './domain/initialize/initialize-person-command.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Person, SalaryStandard]),
    PersonSnapshotModule
  ],
  controllers: [PersonController],
  providers: [
    PersonService,
    PromoteCommandHandler,
    PromotedEventHandler,
    InitializePersonCommandHandler,
    PersonInitializedEventHandler,
  ]
})
export class PersonModule { }
