import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '@patients/patient/patient.controller';
import { PatientService } from '@patients/patient/patient.service';
import { AttentionService } from '@attentions/attention/attention.service';

describe('PatientController', () => {
  let controller: PatientController;
  let service: jest.Mocked<PatientService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue({
              data: [],
              meta: { page: 1, limit: 10, total: 0 },
            }),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: AttentionService,
          useValue: {
            findByPatient: jest.fn().mockResolvedValue({
              data: [],
              meta: { page: 1, limit: 10, total: 0 },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get(PatientService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      (service.remove as jest.Mock).mockResolvedValue(undefined);

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
