import { ICommand } from "@nestjs/cqrs";

export class PromoteCommand implements ICommand {
    constructor(public readonly personId: string) {

    }
}