import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '@patients/patient/patient.controller';
import { PatientService } from '@patients/patient/patient.service';

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
