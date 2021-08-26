import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { SalaryStandard } from "salary-standard/entities/salary-standard.entity";
import { Repository } from "typeorm";
import { RevertPersonCommand } from "./revert-person.command";
// import { Person } from "../../entities/person.entity";
import { PersonSnapshotService } from "person-snapshot/person-snapshot.service";
import { AggregateRepository } from "services/aggregate.repository";
import { PersonAggregate } from "../person.aggregate";
import { Constructor, RevertStrategy } from "./revert.strategy";

@CommandHandler(RevertPersonCommand)
export class RevertPersonCommandHandler implements ICommandHandler<RevertPersonCommand> {

    private strategyMap: Map<string, Constructor<RevertStrategy>> = new Map();

    constructor(
        private publisher: EventPublisher,
        private readonly personAggregateRepository: AggregateRepository<PersonAggregate>,
    ) {
        this.strategyMap = RevertStrategy.GetImplementations();
    }

    async execute(command: RevertPersonCommand): Promise<any> {

        /** execution of command handling. */
        const person: PersonAggregate = this.publisher.mergeObjectContext(
            await this.personAggregateRepository.load(command.personId, PersonAggregate)
        );

        const eventStream = await this.personAggregateRepository.eventStream(command.personId);
        const event = eventStream.filter(e => (<{ transactionId: string }>e.data).transactionId === command.personSnapshotId)[0];

        // choose a revert strategy to process the revert event.
        const strategy: RevertStrategy = new this.strategyMap[event?.type]();
        strategy.process(person, event.data);

        /** cqrs code begin */
        person.commit();
        /** cqrs code end */
    }

}