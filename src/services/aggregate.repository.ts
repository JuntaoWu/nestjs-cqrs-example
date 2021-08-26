
import { EventType, FORWARDS, ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { Injectable } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { client as eventStore } from 'services/event-store';

type Constructor<T extends {} = {}> = new (...args: any[]) => T;

@Injectable()
export class AggregateRepository<T> {
    constructor() {

    }

    public async load(id: any, constructor: Constructor<T>): Promise<T> {
        return this.loadOrCreate(id, constructor);
    }

    public loadEvents(id: any): StreamingRead<ResolvedEvent<EventType>> {
        const stream = eventStore.readStream(id, {
            direction: FORWARDS
        });
        return stream;
    }

    public async eventStream(id: any): Promise<EventType[]> {
        const stream = this.loadEvents(id);
        const result = [];
        for await (const { event } of stream) {
            result.push(event);
        }
        return result;
    }

    private async loadOrCreate(id: any, constructor: Constructor<T>): Promise<T> {
        const stream = this.loadEvents(id);
        const result = new constructor();
        const methods: any[] = Reflect.getMetadata(Symbol.for('EventSourcingHandler'), result);

        for await (const { event } of stream) {
            const eventSourcingHandler = `on${this.capitalize(event.type)}`;
            if (methods.includes(eventSourcingHandler)) {
                result[eventSourcingHandler].call(result, event.data, true);
            }
        }
        return result;
    }

    private capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}