import { Test, TestingModule } from '@nestjs/testing';
import { PersonSnapshotService } from './person-snapshot.service';

describe('PersonSnapshotService', () => {
  let service: PersonSnapshotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonSnapshotService],
    }).compile();

    service = module.get<PersonSnapshotService>(PersonSnapshotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
