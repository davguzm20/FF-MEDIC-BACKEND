import { Medicament, Manufacturer, DosageForm } from '@prisma/client';
import { MedicamentEntity } from './medicament.entity';
import { MedicamentResponse } from './dtos/medicament.response';

type MedicamentWithRelations = Medicament & {
  manufacturer: Manufacturer;
  dosageForm: DosageForm;
};

export const medicamentToEntity = (
  medicament: Medicament,
): MedicamentEntity => ({
  medicamentId: medicament.medicamentId,
  name: medicament.name,
  manufacturerId: medicament.manufacturerId,
  concentration: medicament.concentration,
  dosageFormId: medicament.dosageFormId,
  isActive: medicament.isActive,
  createdAt: medicament.createdAt,
  updatedAt: medicament.updatedAt,
});

export const medicamentToResponse = (
  medicament: MedicamentWithRelations,
): MedicamentResponse => ({
  medicamentId: medicament.medicamentId,
  name: medicament.name,
  manufacturerId: medicament.manufacturerId,
  concentration: medicament.concentration,
  dosageFormId: medicament.dosageFormId,
  isActive: medicament.isActive,
  manufacturer: {
    manufacturerId: medicament.manufacturer.manufacturerId,
    name: medicament.manufacturer.name,
  },
  dosageForm: {
    dosageFormId: medicament.dosageForm.dosageFormId,
    name: medicament.dosageForm.name,
  },
  createdAt: medicament.createdAt,
  updatedAt: medicament.updatedAt,
});
