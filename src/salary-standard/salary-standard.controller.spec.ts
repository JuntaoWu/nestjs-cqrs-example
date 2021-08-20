import { Test, TestingModule } from '@nestjs/testing';
import { SalaryStandardController } from './salary-standard.controller';
import { SalaryStandardService } from './salary-standard.service';

describe('SalaryStandardController', () => {
  let controller: SalaryStandardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryStandardController],
      providers: [SalaryStandardService],
    }).compile();

    controller = module.get<SalaryStandardController>(SalaryStandardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
