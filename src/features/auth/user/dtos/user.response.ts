export class UserResponse {
  userId!: number;
  roleId!: number;
  name!: string;
  paternalSurname!: string;
  maternalSurname!: string;
  cmpCode!: string | null;
  username!: string;
  email!: string;
  isActive!: boolean;
  role!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
