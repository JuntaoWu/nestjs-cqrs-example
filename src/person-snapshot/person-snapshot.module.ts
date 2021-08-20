import { Module } from '@nestjs/common';
import { PersonSnapshotService } from './person-snapshot.service';
import { PersonSnapshotController } from './person-snapshot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonSnapshot } from './entities/person-snapshot.entity';
import { PromotedEventHandler } from './event-handlers/promoted-event.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { PersonInitializedEventHandler } from './event-handlers/person-initialized-event.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PersonSnapshot]),
  ],
  controllers: [PersonSnapshotController],
  providers: [
    PersonSnapshotService,
    PromotedEventHandler,
    PersonInitializedEventHandler,
  ],
  exports: [PersonSnapshotService]
})
export class PersonSnapshotModule { }
