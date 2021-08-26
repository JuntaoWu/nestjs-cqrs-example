import { AggregateRoot, EventsHandler } from "@nestjs/cqrs";
import { randomUUID } from "crypto";
import { SalaryStandard } from "salary-standard/entities/salary-standard.entity";
import { Column, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Repository } from "typeorm";
import { PromotedEvent } from "../domain/promote/promote.event";
import { Exclude } from 'class-transformer';
import { InitializePersonCommand } from "../domain/initialize/initialize-person.command";
import { PersonInitializedEvent } from "../domain/initialize/person-initialized.event";
import { EventSourcingHandler } from "services/event-sourcing-handler";
import { AggregateIdentifier } from "services/aggregate-identifier";

@Entity("person")
/** DDD concept AggregateRoot migrated to PersonAggregate already */
export class Person {

    // @AggregateIdentifier()
    @PrimaryColumn()
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ type: 'integer', default: 1 })
    salaryGrade: number;

    @Column({ type: 'decimal', default: 0 })
    salaryTotal: number;

    get name() {
        return `${this.firstname} ${this.lastname}`;
    }

    @Exclude()
    @DeleteDateColumn()
    deletedDate: Date;

    // async initialize(command: InitializePersonCommand) {
    //     Object.assign(this, command);

    //     const initializedEvent = new PersonInitializedEvent(randomUUID(), command.personId, command.firstname, command.lastname);
    //     this.apply(initializedEvent);
    // }

    // async promote(salaryStandardRepository: Repository<SalaryStandard>) {

    //     /** traditional way to handle domain logic */
    //     // this.salaryGrade += 1;
    //     // const salaryStandard = await salaryStandardRepository.findOne({ salaryGrade: this.salaryGrade });
    //     // this.salaryTotal = salaryStandard.amount;

    //     /** cqrs code begin */
    //     const previousAmount = this.salaryTotal;
    //     const salaryStandard = await salaryStandardRepository.findOne({ salaryGrade: this.salaryGrade + 1 });
    //     const promotedEvent = new PromotedEvent(randomUUID(), this.id, 1, previousAmount, salaryStandard.amount);
    //     this.apply(promotedEvent);
    //     /** cqrs code ended. */
    // }

    // /** !!!note that only named "onEventName" will be auto called. */
    // @EventSourcingHandler()
    // onPersonInitializedEvent(event: PersonInitializedEvent) {
    //     console.log('onPersonInitializedEvent');
    // }

    // /** !!!note that only named "onEventName" will be auto called. */
    // @EventSourcingHandler()
    // onPromotedEvent(event: PromotedEvent) {
    //     console.log('onPromotedEvent');
    // }
}

