import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { SalaryStandard } from "salary-standard/entities/salary-standard.entity";
import { Repository } from "typeorm";
// import { Person } from "../../entities/person.entity";
import { InitializePersonCommand } from "./initialize-person.command";
import { PersonService } from "../../person.service";
import { AggregateRepository } from "services/aggregate.repository";
import { PersonAggregate } from "../person.aggregate";

@CommandHandler(InitializePersonCommand)
export class InitializePersonCommandHandler implements ICommandHandler<InitializePersonCommand> {

    constructor(
        // @InjectRepository(Person)
        // private personRepository: Repository<Person>,
        private publisher: EventPublisher,
        // private personService: PersonService,
        private readonly personAggregateRepository: AggregateRepository<PersonAggregate>
    ) {

    }

    async execute(command: InitializePersonCommand): Promise<any> {
        /** validation logic for this command. */

        /** execution of command handling. */
        const personAggregate = await this.personAggregateRepository.load(command.personId, PersonAggregate);
        // const person = this.publisher.mergeObjectContext(new Person());
        const person = this.publisher.mergeObjectContext(personAggregate);

        await person.initialize(command);

        /** rather than execute persist, view updates, notification logic, etc here, we use commit to publish an event. */
        // const person = new Person();
        // Object.assign(person, command);
        // await this.personRepository.save(person);
        // await this.personSnapshotService.create(person);

        /** cqrs code begin */
        person.commit();
        /** cqrs code end */
    }

}