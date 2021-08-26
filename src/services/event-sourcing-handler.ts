
import { jsonEvent } from "@eventstore/db-client";
import { IEvent } from "@nestjs/cqrs";
import "reflect-metadata";
import { client as eventStore } from 'services/event-store';

const metadataKey = Symbol.for('EventSourcingHandler');

export const EventSourcingHandler = () => {

    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

        const originalMethod = descriptor.value;

        /**
         * Wrapping the original method
         * !!! Note that we should not use (arrow function) here because we need the "this binding" passed in.
         * !!! The parent call is: handler.call(this, event);
         * "this" means the AggregateRoot itself.
         * 
         * !!! note: args[1] here means replay event.
         */
        descriptor.value = function (...args: any[]) {

            console.log('EventSourcingHandler called: ', args);

            const result = originalMethod.apply(this, args);

            if (!args[1]) {
                persistEventSourcingData(this, args[0]);
            }

            return result;
        };

        let properties: string[] = Reflect.getMetadata(metadataKey, target);

        if (properties) {
            properties.push(propertyKey);
        } else {
            properties = [propertyKey];
            Reflect.defineMetadata(metadataKey, properties, target);
        }
    };
};

const persistEventSourcingData = async (thisBinding, event: IEvent) => {

    const genericEvent = jsonEvent({
        type: event.constructor.name,
        data: {
            ...event
        },
    });

    // note that we could getMetadata from aggregateRoot instead of event.
    // const properties: string[] = Reflect.getMetadata(Symbol.for("TargetAggregateIdentifier"), event);
    const properties: string[] = Reflect.getMetadata(Symbol.for("AggregateIdentifier"), thisBinding);
    if (properties?.length != 1) {
        throw new Error("AggregateIdentifier must be decorated uniquely.");
    }

    await eventStore.appendToStream(thisBinding[properties[0]], [genericEvent]);
}