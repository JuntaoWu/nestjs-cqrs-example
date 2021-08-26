import { ICommand } from "@nestjs/cqrs";

export class RevertPersonCommand implements ICommand {
    constructor(public readonly personId: string, public readonly personSnapshotId: string) {

    }
}