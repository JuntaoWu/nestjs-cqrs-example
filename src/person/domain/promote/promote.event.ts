import { IEvent } from "@nestjs/cqrs";

export class PromotedEvent implements IEvent {
    constructor(
        public readonly transactionId: string,
        public readonly personId: string,
        public readonly plusGrade: number,
        public readonly previousAmount: number,
        public readonly targetAmount: number,
    ) { }
}