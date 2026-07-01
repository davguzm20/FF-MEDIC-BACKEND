import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '../../../../../../src/features/patients/patient/controllers/patient.controller';
import { PatientService } from '../../../../../../src/features/patients/patient/services/patient.service';

describe('PatientController', () => {
  let controller: PatientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
