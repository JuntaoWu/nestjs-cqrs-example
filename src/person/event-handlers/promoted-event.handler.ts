import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PromotedEvent } from "../domain/promote/promote.event";
import { Person } from "../entities/person.entity";

@EventsHandler(PromotedEvent)
export class PromotedEventHandler implements IEventHandler<PromotedEvent> {
    constructor(@InjectRepository(Person) private repository: Repository<Person>) { }

    // todo:
    // should handle revert event also.
    async handle(event: PromotedEvent) {
        const person = await this.repository.findOne(event.personId);
        person.salaryGrade += event.plusGrade;
        person.salaryTotal = event.targetAmount;
        await this.repository.save(person);
    }
}