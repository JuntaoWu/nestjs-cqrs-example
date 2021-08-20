import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { SalaryStandard } from "src/salary-standard/entities/salary-standard.entity";
import { Repository } from "typeorm";
import { PromoteCommand } from "./promote.command";
import { Person } from "../../entities/person.entity";
import { PersonSnapshotService } from "src/person-snapshot/person-snapshot.service";

@CommandHandler(PromoteCommand)
export class PromoteCommandHandler implements ICommandHandler<PromoteCommand> {

    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        @InjectRepository(SalaryStandard)
        private salaryStandardRepository: Repository<SalaryStandard>,
        private publisher: EventPublisher,
        private personSnapshotService: PersonSnapshotService,
    ) {

    }

    async execute(command: PromoteCommand): Promise<any> {
        /** validation logic for this command. */

        /** execution of command handling. */
        const person = this.publisher.mergeObjectContext(await this.personRepository.findOne(command.personId));

        await person.promote(this.salaryStandardRepository);

        /** rather than execute persist, view updates, notification logic, etc here, we use commit to publish an event. */
        // await this.personRepository.save(person);
        // await this.personSnapshotService.create(person);

        /** cqrs code begin */
        person.commit();
        /** cqrs code end */
    }

}