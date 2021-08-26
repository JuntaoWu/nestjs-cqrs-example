import { IEvent } from "@nestjs/cqrs";
import { TargetAggregateIdentifier } from "services/target-aggregate-identifier";

export class PromotedEvent implements IEvent {
    @TargetAggregateIdentifier()
    public readonly personId: string;

    constructor(
        public readonly transactionId: string,
        personId: string,
        public readonly plusGrade: number,
        public readonly previousAmount: number,
        public readonly targetAmount: number,
    ) {
        this.personId = personId;
     }
}