import { IEvent } from "@nestjs/cqrs";
import { TargetAggregateIdentifier } from "services/target-aggregate-identifier";

export class PersonInitializedEvent implements IEvent {
    @TargetAggregateIdentifier()
    public readonly personId: string;
    constructor(
        public readonly transactionId: string,
        personId: string,
        public readonly firstname: string,
        public readonly lastname: string,
    ) {
        this.personId = personId;
    }
}