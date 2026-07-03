import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { SignSymptomRepository } from '@attentions/sign-symptom/sign-symptom.repository';

describe('SignSymptomRepository', () => {
  let repository: SignSymptomRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignSymptomRepository,
        {
          provide: PrismaService,
          useValue: {
            signSymptom: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<SignSymptomRepository>(SignSymptomRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
