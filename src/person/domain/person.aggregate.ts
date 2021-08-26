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

/** DDD concept AggregateRoot */
export class PersonAggregate extends AggregateRoot {

    @AggregateIdentifier()
    id: string;

    firstname: string;

    lastname: string;

    salaryGrade: number;

    salaryTotal: number;

    async initialize(command: InitializePersonCommand) {
        const initializedEvent = new PersonInitializedEvent(randomUUID(), command.personId, command.firstname, command.lastname);
        this.apply(initializedEvent);
    }

    async promote(salaryStandardRepository: Repository<SalaryStandard>) {

        /** traditional way to handle domain logic */
        // this.salaryGrade += 1;
        // const salaryStandard = await salaryStandardRepository.findOne({ salaryGrade: this.salaryGrade });
        // this.salaryTotal = salaryStandard.amount;

        /** cqrs code begin */
        const previousAmount = this.salaryTotal;
        const salaryStandard = await salaryStandardRepository.findOne({ salaryGrade: this.salaryGrade + 1 });
        const promotedEvent = new PromotedEvent(randomUUID(), this.id, 1, previousAmount, salaryStandard.amount);
        this.apply(promotedEvent);
        /** cqrs code ended. */
    }

    /** !!!note that only named "onEventName" will be auto called. */
    @EventSourcingHandler()
    onPersonInitializedEvent(event: PersonInitializedEvent) {
        console.log('onPersonInitializedEvent');
        Object.assign(this, event);
    }

    /** !!!note that only named "onEventName" will be auto called. */
    @EventSourcingHandler()
    onPromotedEvent(event: PromotedEvent) {
        console.log('onPromotedEvent');
        this.salaryGrade += event.plusGrade;
        this.salaryTotal = event.targetAmount;
    }
}

