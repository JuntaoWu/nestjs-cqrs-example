import { IEvent } from "@nestjs/cqrs";
import { PersonAggregate } from "../person.aggregate";

export type Constructor<T> = {
    new(...args: any[]): T;
    readonly prototype: T;
}

export interface RevertStrategy {
    // add some methods or something to distinguish from {}
    process(personAggregate: PersonAggregate, event: IEvent): void;
}

// add a registry of the type you expect
export namespace RevertStrategy {

    const implementations: Map<string, Constructor<RevertStrategy>> = new Map();
    export function GetImplementations(): Map<string, Constructor<RevertStrategy>> {
        return implementations;
    }
    export function register<T extends Constructor<RevertStrategy>>(name?: string) {
        return (ctor: T) => {
            implementations.set(name || ctor.name, ctor);
        };
    }
}