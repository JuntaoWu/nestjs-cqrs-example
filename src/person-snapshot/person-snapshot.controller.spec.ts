import { Test, TestingModule } from '@nestjs/testing';
import { PersonSnapshotController } from './person-snapshot.controller';
import { PersonSnapshotService } from './person-snapshot.service';

describe('PersonSnapshotController', () => {
  let controller: PersonSnapshotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonSnapshotController],
      providers: [PersonSnapshotService],
    }).compile();

    controller = module.get<PersonSnapshotController>(PersonSnapshotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
