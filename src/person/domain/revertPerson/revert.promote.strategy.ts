import { IEvent } from "@nestjs/cqrs";
import { PersonAggregate } from "../person.aggregate";
import { PromotedEvent } from "../promote/promote.event";
import { RevertStrategy } from "./revert.strategy";

@RevertStrategy.register(PromotedEvent.name)
export class RevertPromoteStrategy implements RevertStrategy {

    process(personAggregate: PersonAggregate, event: PromotedEvent): void {
        personAggregate.revertPromotedEvent(event);
    }
}