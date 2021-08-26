import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonInitializedEvent } from "person/domain/initialize/person-initialized.event";
import { Not, Repository } from "typeorm";
import { PersonSnapshot } from "../entities/person-snapshot.entity";

@EventsHandler(PersonInitializedEvent)
export class PersonInitializedEventHandler implements IEventHandler<PersonInitializedEvent> {
    constructor(
        @InjectRepository(PersonSnapshot)
        private repository: Repository<PersonSnapshot>
    ) {

    }

    // todo:
    // should handle revert event also.
    async handle(event: PersonInitializedEvent) {
        const newPersonSnapshot = this.repository.create(event);
        newPersonSnapshot.id = event.transactionId;
        await this.repository.save(newPersonSnapshot);
    }
}