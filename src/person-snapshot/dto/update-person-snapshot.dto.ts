import { PartialType } from '@nestjs/swagger';
import { CreatePersonSnapshotDto } from './create-person-snapshot.dto';

export class UpdatePersonSnapshotDto extends PartialType(CreatePersonSnapshotDto) {}
