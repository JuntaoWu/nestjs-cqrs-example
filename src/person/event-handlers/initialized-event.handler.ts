import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PersonInitializedEvent } from "../domain/initialize/person-initialized.event";
import { Person } from "../entities/person.entity";

@EventsHandler(PersonInitializedEvent)
export class PersonInitializedEventHandler implements IEventHandler<PersonInitializedEvent> {
    constructor(@InjectRepository(Person) private repository: Repository<Person>) { }

    // todo:
    // should handle revert event also.
    async handle(event: PersonInitializedEvent) {
        const person = this.repository.create(event);
        person.id = event.personId;
        return await this.repository.save(person);
    }
}