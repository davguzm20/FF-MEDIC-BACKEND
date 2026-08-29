import { UserRole } from '@prisma/client';

export class UserResponse {
  userId!: number;
  name!: string;
  paternalSurname!: string;
  maternalSurname!: string;
  cmpCode!: string | null;
  username!: string;
  email!: string;
  role!: UserRole;
}
