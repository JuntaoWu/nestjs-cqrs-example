
import { jsonEvent } from "@eventstore/db-client";
import { IEvent } from "@nestjs/cqrs";
import "reflect-metadata";
import { client as eventStore } from 'src/services/event-store';

export const EventSourcingHandler = () => {

    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

        const originalMethod = descriptor.value;

        // DO stuff here...
        console.log('EventSourcingHandler called.');

        // Wrapping the original method
        descriptor.value = (...args: any[]) => {

            console.log(args);

            const result = originalMethod.apply(this, args);

            persistEventSourcingData(args[0]);

            return result;
        };
    };
};

const persistEventSourcingData = async (event: IEvent) => {

    const genericEvent = jsonEvent({
        type: event.constructor.name,
        data: {
            ...event
        },
    });

    const properties: string[] = Reflect.getMetadata(Symbol("TargetAggregateIdentifier"), event);
    if (properties.length != 1) {
        throw new Error("TargetAggregateIdentifier must be decorated uniquely.");
    }

    await eventStore.appendToStream(event[properties[0]], [genericEvent]);
}