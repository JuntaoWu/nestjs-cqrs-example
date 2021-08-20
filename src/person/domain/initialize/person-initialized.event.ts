import { IEvent } from "@nestjs/cqrs";

export class PersonInitializedEvent implements IEvent {
    constructor(
        public readonly transactionId: string,
        public readonly personId: string,
        public readonly firstname: string,
        public readonly lastname: string,
    ) { }
}