import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisController } from '@attentions/diagnosis/diagnosis.controller';
import { DiagnosisService } from '@attentions/diagnosis/diagnosis.service';

describe('DiagnosisController', () => {
  let controller: DiagnosisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosisController],
      providers: [
        {
          provide: DiagnosisService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            search: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DiagnosisController>(DiagnosisController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
