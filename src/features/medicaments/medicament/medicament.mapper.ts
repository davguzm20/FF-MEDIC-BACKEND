import { Medicament, Manufacturer, DosageForm } from '@prisma/client';
import { MedicamentEntity } from './medicament.entity';
import { MedicamentResponse } from './dtos/medicament.response';

type MedicamentWithRelations = Medicament & {
  manufacturer: Manufacturer;
  dosageForm: DosageForm;
  activeIngredients?: {
    activeIngredient: { activeIngredientId: number; name: string };
  }[];
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
    name: medicament.manufacturer.name,
  },
  dosageForm: {
    name: medicament.dosageForm.name,
  },
  activeIngredients:
    medicament.activeIngredients?.map((mi) => ({
      name: mi.activeIngredient.name,
    })) ?? [],
});
