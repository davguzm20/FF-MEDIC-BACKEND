export interface UserEntity {
  userId: number;
  roleId: number;
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
  role: string;
}
