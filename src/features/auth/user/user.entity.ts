import { UserRole } from '@prisma/client';

export interface UserEntity {
  userId: number;
  role: UserRole;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  cmpCode: string | null;
  username: string;
  password: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
