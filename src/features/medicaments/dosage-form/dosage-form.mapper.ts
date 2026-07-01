import { DosageForm } from '@prisma/client';
import { DosageFormEntity } from './dosage-form.entity';
import { DosageFormResponse } from './dtos/dosage-form.response';

export const dosageFormToEntity = (
  dosageForm: DosageForm,
): DosageFormEntity => ({
  dosageFormId: dosageForm.dosageFormId,
  name: dosageForm.name,
  isActive: dosageForm.isActive,
});

export const dosageFormToResponse = (
  dosageForm: DosageFormEntity,
): DosageFormResponse => ({
  dosageFormId: dosageForm.dosageFormId,
  name: dosageForm.name,
  isActive: dosageForm.isActive,
});
