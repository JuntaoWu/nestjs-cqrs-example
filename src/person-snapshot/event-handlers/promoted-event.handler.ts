import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { PromotedEvent } from "person/domain/promote/promote.event";
import { Not, Repository } from "typeorm";
import { PersonSnapshot } from "../entities/person-snapshot.entity";

@EventsHandler(PromotedEvent)
export class PromotedEventHandler implements IEventHandler<PromotedEvent> {
    constructor(
        @InjectRepository(PersonSnapshot)
        private repository: Repository<PersonSnapshot>
    ) {

    }

    async handle(event: PromotedEvent) {
        const latestPersonSnapshot = await this.repository.findOne({ personId: event.personId, id: Not(event.transactionId) }, {
            order: {
                'id': 'DESC'
            }
        });

        const newPersonSnapshot = this.repository.create(latestPersonSnapshot);
        newPersonSnapshot.id = event.transactionId;
        newPersonSnapshot.salaryGrade += event.plusGrade;
        newPersonSnapshot.salaryTotal = event.targetAmount;

        await this.repository.save(newPersonSnapshot);
    }
}