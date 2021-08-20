import { ICommand } from "@nestjs/cqrs";

export class InitializePersonCommand implements ICommand {
    constructor(
        public readonly personId: string,
        public readonly firstname: string,
        public readonly lastname: string,
    ) {

    }
}