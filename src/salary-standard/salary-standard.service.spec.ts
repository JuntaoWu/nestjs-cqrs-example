import { Test, TestingModule } from '@nestjs/testing';
import { SalaryStandardService } from './salary-standard.service';

describe('SalaryStandardService', () => {
  let service: SalaryStandardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryStandardService],
    }).compile();

    service = module.get<SalaryStandardService>(SalaryStandardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
